/*
 * Isaac chat
 * a1.0.0
 * By Isaac Chen
 * 2/24/2020
 */

// Set up the server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
// Server by default serves static content in the "client" folder
app.use(express.static("client"));
// Prevent people flooding the server with too much data
app.use(express.json({
	limit: "1mb"
}));

// Set up sockets
const socket = require("socket.io");
const io = socket(server);

// When a new socket connects
io.sockets.on("connection", function(socket) {
	socket.on("chatMsg", function(data) {
		const msg = data.msg;
		const username = data.username;
		if(typeof msg !== "string") {
			console.log("Received invalid chatMsg data! data.msg was not a string!");
			return;
		}
		if(typeof username !== "string") {
			console.log("Received invalid chatMsg data! data.username was not a string!");
			return;
		}
		
		newChatMsg(username, msg);
	})
});

// Client communication
function newChatMsg(username, msg) {
	console.log(`<${username}> ${msg}`);
	
	io.sockets.emit("chatMsg", {
		username: username,
		msg: msg
	});
}
function sendRawMsg(text) {
	console.log(text);
	
	io.sockets.emit("rawMsg", {
		text: text
	});
}