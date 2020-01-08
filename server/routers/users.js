const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../db/db.js");
const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth.js");

// Salt rounds for hashing password
const saltRounds = 12;


app.post("/user/login", function(req, res) {
	// TODO validta indput

	connection.query("SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1", [req.body.identifier, req.body.identifier], function(err, results) {
		if (err) {
			throw err;
		}
		if (results.length > 0) {

			bcrypt.compare(req.body.password, results[0].password, function(err, isPassword) {
				if (err) {
					throw err;
				}

				if(isPassword) {
					// Password is correct
					var id = results[0].id;

					jwt.sign({ id: id }, process.env.TOKEN_SECRET, {expiresIn: "1d"}, function(err, token) {
						connection.query("UPDATE users SET token = ? WHERE id = ?", [token, id], function(err) {
							if (err) {
								throw err;
							}

							res.header("Authorization", token).sendStatus(200);
						});
					});
				} else {
					// Password is not correct
					console.log("password in not correct");
					res.sendStatus(400);
				}
			});
		} else {
			res.sendStatus(400);
		}
	});
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
				connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hash], function(err) {
					if (err) {
						throw err;
					}
					//var id = results.insertId;
					//var privateKey = "test";
					res.sendStatus(200);
				});
			});
		}

	});

});

app.get("/user/:id", function(req, res) {
	var id = req.params.id;

	connection.query("SELECT email, username FROM users WHERE id = ? LIMIT 1", [id], function(err, results) {
		if (results.length === 0) {
			res.send("no user with id: " + id).status(404);
		} else {
			res.send(results);
		}
	});
});

app.get("/user/:id/stats", function(req, res) {
	var id = req.params.id;
	connection.query("SELECT email, username FROM users WHERE id = ? LIMIT 1", [id], function(err, results) {
		if (results.length === 0) {
			res.send(req.errors).status(404);
		} else {
			res.send(results);
		}
	});
});

//app.get("/user/:id/stats", auth, function(req, res) {
//	if (req.user != undefined && req.errors != undefined) {
//		var id = req.params.id;
//
//		connection.query("SELECT email, username FROM users WHERE id = ? LIMIT 1", [id], function(err, results) {
//			console.log(results.length);
//			if (results.length === 0) {
//				res.send(req.errors).status(404);
//			} else {
//				res.send(results);
//			}
//		});
//	} else {
//		if (req.errors != undefined) {
//			res.send(req.errors);
//		} else if (req.user != undefined) {
//			res.send("user error");
//			console.log(req.user);
//		} else {
//			res.send("error");
//			console.log(req.errors);
//		}
//	}
//});

module.exports = app;
