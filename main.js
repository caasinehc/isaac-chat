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
	console.log(`Listening on port: ${PORT}`)
});
// Server by default serves static content in the "client" folder
app.use(express.static("client"));
// Prevent people flooding the server with too much data
app.use(express.json({
	limit: "1mb"
}));