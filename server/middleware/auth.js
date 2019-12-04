const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
	const token = req.header("Authorization")

	if(!token) {
		// No token
	}

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
	} catch {
		res.status(400).send("invalid token");
	}

	next();
	//const token = req.header('Authorization').replace('Bearer ', '')
	//const data = jwt.verify(token, process.env.JWT_KEY)
	//try {
	//	const user = await User.findOne({ _id: data._id, 'tokens.token': token })
	//	if (!user) {
	//		throw new Error()
	//	}
	//	req.user = user
	//	req.token = token
	//	next()
	//} catch (error) {
	//	res.status(401).send({ error: 'Not authorized to access this resource' })
	//}

}
module.exports = auth
