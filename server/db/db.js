const mysql = require("mysql");
const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

connection.connect(function(err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	} else {
		console.log("successfully connected to db (" + process.env.MYSQL_HOST + ")");
	}
});

// TODO imporve this!
const sql = require("./create-tables.js");

connection.query(sql, function(err, results) {
	if (err) throw err;
});

module.exports = connection;
