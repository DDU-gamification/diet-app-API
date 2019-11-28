const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../db/db.js");

const saltRounds = 12;

app.get("/", function(req, res) {
	res.send("NO! world!");
});

app.post("/user/signup", function(req, res) {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const passwordCheck = req.body.passwordCheck;

	// TODO
	// Check if every req is not empty
	// Check if every req is valid
	
	var errorResponse = {"errors": []};

	if (password !== passwordCheck) {
		errorResponse.errors.push({"reason": "Password is not the same"});
	}

	connection.query("SELECT COUNT( IF(email = ?, 1, NULL) ) AS email, COUNT( IF(username = ?, 1, NULL) ) AS username FROM users", [email, username], function(err, results) {

		const r = results[0];

		if (r.email === 1) {
			errorResponse.errors.push({"reason": "Email already exists"});
		}

		if (r.username === 1) {
			errorResponse.errors.push({"reason": "Username already exists"});
		}

		if (Object.entries(errorResponse.errors).length !== 0) {
			res.status(400).json(errorResponse);
		} else {
			bcrypt.hash(password, saltRounds, function(err, hash) {
				connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hash], function(err, results) {
					res.sendStatus(200);
				});
			});
		}

	});

});

module.exports = app;
