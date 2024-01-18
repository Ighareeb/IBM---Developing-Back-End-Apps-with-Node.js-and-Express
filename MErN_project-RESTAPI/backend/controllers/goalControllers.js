const asyncHandler = require('express-async-handler'); //express doesn't handle async errors by default promise errors wouldn't be caught - wrap async route handlers with asyncHandler so it passes the error to our custom errorHandler middleware

//GET /api/goals -->get goals
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get goals' });

	console.log(err);
});

//POST /api/goals -->set goal
const setGoal = asyncHandler(async (req, res) => {
	//to use body data you need to app.use middleware express.json() + express.urlencoded() - see server.js
	console.log(req.body);
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	res.status(200).json({ message: 'Set goal' });
});

//PUT /api/goals/:id -->update goal
const updateGoal = asyncHandler(async (req, res, id) => {
	res.status(200).json({ message: `Update goal ${req.params.id}` });

	console.log(err);
});
//DELETE /api/goals/:id -->delete goal
const deleteGoal = asyncHandler(async (req, res, id) => {
	res.status(200).json({ message: `Goal with id:${req.params.id} deleted` });

	console.log(err);
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
