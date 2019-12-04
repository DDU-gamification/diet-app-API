const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../db/db.js");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth.js");



const saltRounds = 12;

app.get("/", function(req, res) {
	res.send("NO! world!");
});

app.post("/user/login", function(req, res) {
	// TODO validta indput

	connection.query("SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1", [req.body.identifier, req.body.identifier], function(err, results) {
		if (results.length > 0) {

			bcrypt.compare(req.body.password, results[0].password, function(err, isPassword) {
				if(isPassword) {
					// Password is correct
					var id = results.insertId;
					console.log("test");
					console.log(results);

					jwt.sign({ id: id }, process.env.TOKEN_SECRET, {expiresIn: "1d"}, function(err, token) {
						connection.query("UPDATE users SET token = ? WHERE id = ?", [token, id], function(err, results) {
							console.log(token);
							res.header("Authorization", token).sendStatus(200);
						});
					});
				} else {
					// Password is not correct
					res.sendStatus(400);
				}
			});
		} else {
			res.sendStatus(400);
		}
	});

	//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
	//console.log(token);
	//jwt.verify(token, 'shhhhh', function(err, decoded) {
	//	console.log(decoded) // bar
	//});

});

app.post("/user/signup", function(req, res) {
	//const user = new User({
	//	email: req.body.email,
	//	username: req.body.username,
	//	password: req.body.password,
	//	passwordCheck: req.body.passwordCheck
	//});

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
					//var id = results.insertId;
					//var privateKey = "test";

					res.send(200);


				});
			});
		}

	});

});



app.get("/no", auth, function(req, res) {

});

module.exports = app;
