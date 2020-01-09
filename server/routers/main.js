const express = require("express");
const app = express.Router();
const multer = require("multer");
var upload = multer({ dest: "images/" });

const users = require("./users.js");

app.use(users);

app.post("/img", upload.single("image"), function(req, res) {
	console.log(req.file);
	console.log(JSON.parse(req.body.g));
	res.send("all good");
});

// 404 not found
app.use(function(req, res, next) {
	res.json({"error": "404 \"" + req.url + "\" not found"}).status(404);
	console.log("404 \"" + req.url + "\" not found");
	next();
});

module.exports = app;
