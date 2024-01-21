const Goal = require('../models/goalsModels'); //represents goal collection in mongoosedb, has mongoose methods we can use to interact with our database
const User = require('../models/userModels'); //represents user collection in mongoosedb, has mongoose methods we can use to interact with our database (CRUD)

const asyncHandler = require('express-async-handler'); //express doesn't handle async errors by default promise errors wouldn't be caught - wrap async route handlers with asyncHandler so it passes the error to our custom errorHandler middleware since mongoose uses asynchronous methods

//CRUD functions/logic that will be used in our goal routes:

//GET /api/goals -->get goals
const getGoals = asyncHandler(async (req, res) => {
	// const goals = await Goal.find(); //find all goals from db
	//changed to find only user goals -logged in user
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});

//POST /api/goals -->set goal
const setGoal = asyncHandler(async (req, res) => {
	//to use body data you need to app.use middleware express.json() + express.urlencoded() - see server.js
	console.log(req.body);
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	//send POST request with key === 'text' and set its value (this structure is based on how we created schema for goal)
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id, //added so only logged in user can set goal
	});

	res.status(200).json(goal);
});

//PUT /api/goals/:id -->update goal
const updateGoal = asyncHandler(async (req, res, id) => {
	const goal = await Goal.findById(req.params.id);
	const user = await User.findById(req.user.id);
	if (!goal) {
		res.status(404);
		throw new Error('Goal not found');
	}
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}
	//check if the logged-in user matches the user who created the goal
	if (goal.user.toString() !== req.user.id) {
		//could refactor to if (goal.user.toString() !== user.id) since user variable declared in this function
		res.status(403);
		throw new Error('User not authorized to delete this goal');
	}
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});
//DELETE /api/goals/:id -->delete goal
const deleteGoal = asyncHandler(async (req, res, id) => {
	const goal = await Goal.findById(req.params.id);
	const user = await User.findById(req.user.id);
	if (!goal) {
		res.status(404);
		throw new Error('Goal not found');
	}
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}
	//check if the logged-in user matches the user who created the goal
	if (goal.user.toString() !== req.user.id) {
		res.status(403);
		throw new Error('User not authorized to delete this goal');
	}
	const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

	res.status(200).json({ deletedGoal: deletedGoal, id: req.params.id });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};

// note: In Mongoose, you can use either req.user._id or req.user.id to access the ID of the user.

// req.user._id will give you a BSON type object (specific to MongoDB), while req.user.id will give you a string representation of the ID.

// In most cases, both will work the same way because Mongoose automatically converts strings to ObjectIds where necessary.
