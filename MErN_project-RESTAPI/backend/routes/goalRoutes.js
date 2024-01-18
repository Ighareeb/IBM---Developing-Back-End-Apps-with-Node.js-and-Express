const express = require('express');
const router = express.Router();
const {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers/goalControllers.js');
//get goals
router.get('/', getGoals);
//create goal
router.post('/', setGoal);

//update goal
router.put('/:id', updateGoal);
//delete goal
router.delete('/:id', deleteGoal);

//can be shortened/combined/refactored because of similar routes being used:
//router.route('/').get(getGoals).post(setGoal);
//router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
