const express = require('express');
const router = express.Router(); //creates express built-in router object for middleware and routing functionality.
//need to add to server.js
const {
	registerUser,
	loginUser,
	// getUser,
} = require('../controllers/userControllers.js');

//set up user endpoint routes:

//register user
router.post('/', registerUser);

//login user
router.post('/login', loginUser);

// //get user information
// router.get('/profile', getUser);

module.exports = router;
