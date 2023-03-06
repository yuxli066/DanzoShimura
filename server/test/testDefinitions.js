// tests for sending/receiving messages
const assert = require("chai").assert;
const should = require("chai").should();
const mockClient = require("socket.io-client");
const uri = "http://localhost:" + process.env.PORT;
const patch = require("socketio-wildcard")(mockClient.Manager);
const http = require("http");
const options = {
  transports: ["websocket"],
  "force new connection": true,
};

module.exports = {
  serverStatusTest: function (path) {
    it(`Path to ${path} return 200 status code`, function (done) {
      http.get(uri + path, function (response) {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  },
  singleMessageTest: function (testObjs) {
    var testClient;
    beforeEach((done) => {
      testClient = mockClient.connect(uri, options);
      patch(testClient); // catch all events
      done();
    });
    testObjs.forEach((test) => {
      const req = test.req,
        expected = test.expected;
      it(`Sending websocket server event: ${req.event}, message: ${req.content} to the server 
        should result with event: ${expected.event}, message: ${expected.content} sent back to the client`, function (done) {
        testClient.on("connect", () => {
          testClient.emit(req.event, req.content);
          testClient.on("*", (res) => {
            console.log(`Server Response: ${res.data[1]}`);
            assert.equal(res.data[0], expected.event);
            assert.equal(res.data[1], expected.content);
            done();
          });
        });
      });
    });
    afterEach((done) => {
      testClient.disconnect();
      done();
    });
  },
  broadcastMessageTest: function (testObjs) {
    var testClient, testClient2, testClient3;
    beforeEach((done) => {
      testClient = mockClient.connect(uri, options);
      testClient2 = mockClient.connect(uri, options);
      testClient3 = mockClient.connect(uri, options);
      patch(testClient); // catch all events
      patch(testClient2); // catch all events
      patch(testClient3); // catch all events
      done();
    });
    testObjs.forEach((test) => {
      const req = test.req,
        expected = test.expected;
      let broadcastedMessages = [];
      it(`Sending websocket server event: ${req.event}, message: ${req.content} to the server 
        should result with event: ${expected.event}, message: ${expected.content} broadcasted to ALL client`, function (done) {
        testClient.on("connect", () => {
          testClient.emit(req.event, req.content);
          testClient.on("*", (res) => {
            broadcastedMessages.push(`Client 1 Broadcast Msg: ${res.data[1]}`);
            assert.equal(res.data[0], expected.event);
            assert.equal(res.data[1], expected.content);
          });
          testClient2.on("*", (res) => {
            broadcastedMessages.push(`Client 2 Broadcast Msg: ${res.data[1]}`);
            assert.equal(res.data[0], expected.event);
            assert.equal(res.data[1], expected.content);
          });
          testClient3.on("*", (res) => {
            broadcastedMessages.push(`Client 3 Broadcast Msg: ${res.data[1]}`);
            assert.equal(res.data[0], expected.event);
            assert.equal(res.data[1], expected.content);
          });
        });
        // wait 3s for broadcast to happen, if no broadcast then fail
        setTimeout(() => {
          console.log(broadcastedMessages);
          broadcastedMessages.length.should.equal(3);
          done();
        }, 3000);
      });
    });
    afterEach((done) => {
      testClient.disconnect();
      testClient2.disconnect();
      testClient3.disconnect();
      done();
    });
  },
};
