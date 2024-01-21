const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels.js');

const authHandler = asyncHandler(async (req, res, next) => {
	//HTTP headers have authorization obj that we can check
	//when token sent in authorization header - format is 'Bearer <token>'
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get token from header
			token = req.headers.authorization.split(' ')[1];

			//verify token using secret
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			//get user from db using token and assign it to {req.user} so req.user can be accessed in any protected routes
			req.user = await User.findById(decoded.id).select('-password'); //don't include password in req.user

			next(); //calls next middleware
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('Not authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

module.exports = authHandler; //import in userRoutes.js + goalRoutes.js
