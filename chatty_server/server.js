const express = require("express");
const SocketServer = require("ws").Server;
const uuidv4 = require("uuid/v4");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  users = {
    type: "userCountStatus",
    userCount: wss.clients.size
  };
  console.log(users);
  wss.clients.forEach(client => {
    client.send(JSON.stringify(users));
  });
  // console.log('WYYYEYYEY', ws)
  // console.log('CHECK ONE', numberOfClients)

  ws.on("message", message => {
    console.log('CHECKING THISSS', message)
    const uuid = uuidv4();
    const newMessage = JSON.parse(message);
    newMessage.id = uuid;
    
    switch (newMessage.type) {
      case 'postMessage':
        newMessage.type = 'incomingMessage'
        break;
      case 'postNotification':
        newMessage.type = 'incomingNotification'
        break;
      default:
        throw new Error(`Unknown event Type: ${message.type}` )
    }
    wss.clients.forEach(client => {
      client.send(JSON.stringify(newMessage, wss.clients.size));
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    users = {
      type: "userCountStatus",
      userCount: wss.clients.size
    };
    wss.clients.forEach(client => {
      client.send(JSON.stringify(users));
    });
    // this.send(JSON.stringify(disconnectedClient))
  });
});
