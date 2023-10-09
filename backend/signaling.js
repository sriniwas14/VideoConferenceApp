// signaling.js

const WebSocket = require("ws");
const wss = new WebSocket.Server({ noServer: true });

const rooms = new Map(); // Map to store room data

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      handleSignalingData(data, ws);
    } catch (error) {
      console.error("Invalid message:", message);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    removeClientFromRoom(ws);
  });
});

function handleSignalingData(data, ws) {
  const { type, room, message } = data;

  if (type === "join") {
    // Handle client joining a room
    addClientToRoom(ws, room);
  } else if (
    type === "offer" ||
    type === "answer" ||
    type === "ice-candidate"
  ) {
    // Broadcast the message to clients in the same room
    broadcastToRoom(room, ws, { type, message });
  }
}

function addClientToRoom(ws, room) {
  if (!rooms.has(room)) {
    rooms.set(room, new Set());
  }
  rooms.get(room).add(ws);
}

function removeClientFromRoom(ws) {
  rooms.forEach((clients, room) => {
    if (clients.has(ws)) {
      clients.delete(ws);
      if (clients.size === 0) {
        // Remove the room if no clients are left in it
        rooms.delete(room);
      }
    }
  });
}

function broadcastToRoom(room, sender, message) {
  if (rooms.has(room)) {
    rooms.get(room).forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

module.exports = wss;
