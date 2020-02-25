/*
 * client.js
 * see main.js for full header
 */

// Get this user's information
const USERNAME = ice.math.random(["Alice", "Bob", "Charlie", "Eve", "John", "Jane"]) + " " + ice.math.random(["Chen", "Nguyen", "Smith", "Brown", "Doe"]);

// Set up socket communication with the server
// TODO Don't hardcode this
const socket = io.connect("http://localhost:3000");
socket.on("chatMsg", function(data) {
	newChatMsg(data.msg, data.username);
});
socket.on("rawMsg", function(data) {
	rawMsg(data.text);
});

// Server communication
function newChatMsg(msg, username) {
	rawMsg(`<${username}> ${msg}`);
}
function rawMsg(text) {
	const elem = ice.dom.createP(text);
	elem.classList.add("msg");
	ice.dom.append(elem);
}

function sendChatMsg(msg) {
	if(typeof USERNAME !== "string") {
		console.error("sendChatMsg() error: USERNAME must be a string!");
		return;
	}
	if(typeof msg !== "string") {
		console.error("sendChatMsg() error: msg must be a string!");
		return;
	}
	
	socket.emit("chatMsg", {
		username: USERNAME,
		msg: msg
	});
}