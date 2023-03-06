const {
  singleMessageTest,
  serverStatusTest,
  broadcastMessageTest,
} = require("./testDefinitions");
const loadServer = new Promise((resolve) => resolve(require("../bin/www")));
var server, socketIOServer;

describe("Socket IO Unit Tests", function () {
  const singleMessage1 = {
    req: { event: "greet", content: "Hi there, I'm a client" },
    expected: { event: "response", content: "Hello from server!" },
  };
  const braodcastMessage1 = {
    req: { event: "greetOtherClients", content: "Hello everyone" },
    expected: { event: "broadcast", content: "Hello all clients from server!" },
  };
  before((done) => {
    loadServer.then((svr) => (server = svr));
    done();
  });
  this.timeout(5000);
  describe("Server Status Test", () => serverStatusTest("/"));
  describe("Server Status Test /Users", () => serverStatusTest("/users"));
  describe("Client <-> Server Event Tests", () =>
    singleMessageTest([singleMessage1, singleMessage1]));
  describe("Server Broadcasts Tests", () =>
    broadcastMessageTest([braodcastMessage1]));
  after((done) => {
    server.close();
    done();
  });
});
