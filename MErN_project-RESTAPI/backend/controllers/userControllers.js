const User = require('../models/userModels'); //represents user collection in mongoosedb, has mongoose methods we can use to interact with our database (CRUD)

const asyncHandler = require('express-async-handler'); //express doesn't handle async errors by default promise errors wouldn't be caught - wrap async route handlers with asyncHandler so it passes the error to our custom errorHandler middleware

//CRUD functions/logic that will be used in our user routes:

//POST /api/users -->register user
function registerUser = asyncHandler(async (req, res)=> {
	//to use body data you need to app.use middleware express.json() + express.urlencoded() - see server.js
	if(!req.body.text){
		res.status(400);
		throw new Error('Please add a text field');
	}
	//send POST request with key === 'text' and set its value (this structure is based on how we created schema for user)
	const user = await User.create({
		text: req.body.text,
	})
	res.status(200).json(user);
})

//POST /api/users/login -->login/authenticate user
function loginUser = asyncHandler(async (req, res)=>{})

//GET /api/users/profile -->get user information
function getUser = asyncHandler(async (req, res)=>{})


module.exports = {
	registerUser,
	loginUser,
	getUser,
}