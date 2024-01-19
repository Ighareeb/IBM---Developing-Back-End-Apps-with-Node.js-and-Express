const express = require('express');
const router = express.Router();
const {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers/goalControllers.js');
const authHandler = require('../middleware/authMiddleware.js');

//set up CRUD endpoint routes:

//get goals
router.get('/', authHandler, getGoals);

//create goal
router.post('/', authHandler, setGoal);

//update goal
router.put('/:id', authHandler, updateGoal);

//delete goal
router.delete('/:id', authHandler, deleteGoal);

//can be shortened/combined/refactored because of similar routes being used:
//router.route('/').get(getGoals).post(setGoal);
//router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
