const express = require('express');
const router = express.Router();
const { getGoals } = require('../controllers/goalControllers.js');
//get goals
router.get('/', getGoals);
//create goal
router.post('/', (req, res) => {
	res.status(200).json({ message: 'Get goals' });
});
//update goal
router.put('/:id', (req, res) => {
	res.status(200).json({ message: `Update goal ${req.params.id}` });
});
//delete goal
router.delete('/:id', (req, res) => {
	res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = router;
