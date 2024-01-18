//GET /api/goals -->get goals
const getGoals = (req, res) => {
	try {
		res.status(200).json({ message: 'Get goals' });
	} catch (err) {
		console.log(err);
	}
};

//POST /api/goals -->set goal
const setGoal = (req, res) => {
	try {
		//to use body data you need to app.use middleware express.json() + express.urlencoded() - see server.js
		console.log(req.body);
		if (!req.body.text) {
			res.status(400);
			throw new Error('Please add a text field');
		}
		res.status(200).json({ message: 'Set goal' });
	} catch (err) {
		console.log(err);
	}
};

//PUT /api/goals/:id -->update goal
const updateGoal = (req, res, id) => {
	try {
		res.status(200).json({ message: `Update goal ${req.params.id}` });
	} catch (err) {
		console.log(err);
	}
};
//DELETE /api/goals/:id -->delete goal
const deleteGoal = (req, res, id) => {
	try {
		res.status(200).json({ message: `Goal with id:${req.params.id} deleted` });
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
