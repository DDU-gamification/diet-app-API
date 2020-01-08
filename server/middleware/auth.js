const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const token = req.header("Authorization");

	if(!token) {
		//res.send("no token").status(400);
		req.errors = "no token";
	} else {
		jwt.verify(token, process.env.TOKEN_SECRET, function(err, verified) {
			//if (err) throw err;
			if (verified) {
				req.user = verified;
			} else {
				//res.status(400).send("invalid token");
				req.errors = "invalid token";
			}
		});
	}

	next();
};

module.exports = auth;
