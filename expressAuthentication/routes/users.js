const express = require('express');
const router = express.Router();

let users = [
	{
		firstName: 'John',
		lastName: 'wick',
		email: 'johnwick@gamil.com',
		DOB: '22-01-1990',
	},
	{
		firstName: 'John',
		lastName: 'smith',
		email: 'johnsmith@gamil.com',
		DOB: '21-07-1983',
	},
	{
		firstName: 'Joyal',
		lastName: 'white',
		email: 'joyalwhite@gamil.com',
		DOB: '21-03-1989',
	},
];

// GET request: Retrieve all users
router.get('/', (req, res) => {
	//use JSON.stringify for formatting response
	//The null argument means that all properties of the users object will be included in the string. The 4 argument means that the string will be formatted with 4 spaces of indentation.
	res.send(JSON.stringify({ users }, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get('/:email', (req, res) => {
	const email = req.params.email;
	let filteredUsers = users.filter((user) => user.email === email);
	res.send(filteredUsers);
});

// POST request: Create a new user
//eg. $ curl --request POST 'localhost:5000/user?firstName=Jon&lastName=Lovato&email=jonlovato@theworld.com&DOB=10/10/1995'
router.post('/', (req, res) => {
	//Use push to add the dictionary into the list of users. The user details can be passed as query paramters named

	users.push({
		firstName: req.query.firstName,
		lastName: req.query.lastName,
		email: req.query.email,
		DOB: req.query.DOB,
	});
	res.send(`The user ${req.query.firstName} has been added`);
});

// PUT request: Update the details of a user by email ID
// eg. curl --request PUT 'localhost:5000/user/johnsmith@gamil.com?DOB=1/1/1971'
router.put('/:email', (req, res) => {
	const email = req.params.email; //look for user using email
	let filteredUsers = users.filter((user) => user.email === email);
	if (filteredUsers.length > 0) {
		let filtered_User = filteredUsers[0];
		let DOB = req.query.DOB;
		let firstName = req.query.firstName;
		let lastName = req.query.lastName;
		if (DOB) {
			filtered_User.DOB = DOB;
		}
		if (firstName) {
			filtered_User.firstName = firstName;
		}
		if (lastName) {
			filtered_User.lastName = lastName;
		}
		users = users.filter((user) => user.email != email);
		users.push(filtered_User);
		res.send(`User with the email ${email} has been updated`);
	} else {
		res.send('Unable to find user');
	}
});

// DELETE request: Delete a user by email
//eg. curl --request DELETE 'localhost:5000/user/johnsmith@gamil.com'
router.delete('/:email', (req, res) => {
	const email = req.params.email;
	users = users.filter((user) => user.email != email);
	res.send(`User with the email ${email} has been deleted`);
});

module.exports = router;
