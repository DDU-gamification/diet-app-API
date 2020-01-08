const express = require("express");
const app = express.Router();

const users = require("./users.js");

app.use(users);

// 404 not found
app.use(function(req, res, next) {
	res.status(404);
	res.json("404 not found");
	console.log("404 not found");
});

module.exports = app;
