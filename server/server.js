const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve Frontend from 'public/'
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

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

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});