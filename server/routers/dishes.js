const express = require("express");
const app = express.Router();
const connection = require("../db/db.js");


app.post("/create/ingredient", function(req, res) {
	const ingredient = {
		"name": req.body.name,
		"calorie": req.body.calories,
		"calories_unit": req.body.calories_unit,
		"fat": req.body.fat,
		"fat_unit": req.body.fat_unit,
		"protein": req.body.protein,
		"protein_unit": req.body.protein_unit,
		"carbohydrates": req.body.carbohydrates,
		"carbohydrates_unit": req.body.carbohydrates_unit
	};

	var errorResponse = {"errors": []};

	// Test if filed is empty
	for (var key in ingredient) {
		if (ingredient[key] == "" || ingredient[key] == undefined) {
			errorResponse.errors.push({"error": key + " is missing"});
		}
	}

	// TODO Test id filed is number or string

	// TODO use express-validator
	// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms

	// Test for error
	if (!errorResponse.errors[0]) {
		connection.query("INSERT INTO ingredients (name, calories, calories_unit, fat, fat_unit, protein, protein_unit, carbohydrates, carbohydrates_unit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [ingredient.name, ingredient.calorie, ingredient.calories_unit, ingredient.fat, ingredient.fat_unit, ingredient.protein, ingredient.protein_unit, ingredient.carbohydrates, ingredient.carbohydrates_unit], function(err) {
			if (err) {
				res.sendStatus(500);
				throw err;
			}
			res.sendStatus(200);
		});
	} else {
		res.send(errorResponse).status(400);
	}
});

app.post("/create/dish", function(req, res) {

});

module.exports = app;
