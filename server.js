const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Serve static files from 'public' folder

io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for messages from clients
    socket.on("chat message", ({ username, message }) => {
        const timestamp = new Date().toLocaleTimeString();
        io.emit("chat message", { username, message, timestamp });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});