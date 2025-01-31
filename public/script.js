const socket = io();
let username = "";

function login() {
    username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }
    socket.emit("login", username);
    document.getElementById("login-container").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
}

function sendMessage() {
    const messageInput = document.getElementById("message");
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("chat message", message);
        messageInput.value = "";
    }
}

socket.on("chat message", ({ username, message, timestamp }) => {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${username}</strong>: ${message} <br> <span class="timestamp">${timestamp}</span>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});