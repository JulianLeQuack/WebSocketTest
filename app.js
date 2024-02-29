var express = require("express");
var ws = require("ws");

var app = express();

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var httpServer = app.listen(3000, () => {
    console.log("Listening on port 3000!");
});

var wss = new ws.Server({server: httpServer});

wss.on("connection", (ws, req) => {
  console.log("New ws connection!");
  ws.on("message", (msg) => {
    console.log(`Received message: ${msg.toString()}`);
    wss.clients.forEach((client) => {
      client.send(`Front end output: ${msg.toString()}`);
    });
  });
  ws.on("close", () => {
    console.log("Connection closed!")
  });
});