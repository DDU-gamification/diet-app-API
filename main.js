const express = require("express");
const app = express();

require("dotenv").config();
require("./server/db/db.js");

const router = require("./server/routers/main.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

var server = app.listen(process.env.PORT || 8000, function(){
	console.log("Server is listening on port " + server.address().port);
});
