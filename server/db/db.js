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

const createDB = require("./create-tables.js");

const sql = createDB.sql();

// Loop through every tables and creates them
for (var key in sql) {
	connection.query(sql[key], function(err) {
		if (err) {
			throw err;
		}
	});
}

module.exports = connection;
