/*
 * client.js
 * see main.js for full header
 */

// Set up socket communication with the server
// TODO Don't hardcode this
// const socket = io.connect(location.origin.replace(/^http/, 'ws'));
const socket = io.connect(prompt("Please enter the URL"));
socket.on("chatMsg", function(data) {
	newChatMsg(data.msg, data.username);
});
socket.on("rawMsg", function(data) {
	rawMsg(data.text);
});

// Server communication
function sendChatMsg(msg) {
	if(typeof msg !== "string") {
		console.error("sendChatMsg() error: msg must be a string!");
		return;
	}
	
	socket.emit("chatMsg", {
		username: getUserName(),
		msg: msg
	});
}

// DOM stuff
function newChatMsg(msg, username) {
	rawMsg(`<${username}> ${msg}`);
}
function rawMsg(text) {
	const elem = ice.dom.createP(text);
	elem.classList.add("msg");
	ice.dom.append(elem);
}
const inputBox = document.getElementById("inputBox");
inputBox.addEventListener("keydown", function(e) {
	if(e.key === "Enter") {
		const msgText = inputBox.value;
		inputBox.value = "";
		
		if(msgText.length > 0) sendChatMsg(msgText);
	}
});
const nameInput = document.getElementById("nameInput");
function getUserName() {
	return nameInput.value;
}