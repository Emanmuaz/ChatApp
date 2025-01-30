const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from 'public' (adjust path)
app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("login", (username) => {
        socket.username = username;
        console.log(`${username} joined the chat`);
    });

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

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});