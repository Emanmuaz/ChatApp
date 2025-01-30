const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Serve static files

io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for login event
    socket.on("login", (username) => {
        socket.username = username; // Store username in socket
        console.log(`${username} joined the chat`);
    });

    // Listen for messages
    socket.on("chat message", (message) => {
        const timestamp = new Date().toLocaleTimeString();
        io.emit("chat message", {
            username: socket.username || "Anonymous",
            message,
            timestamp,
        });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});