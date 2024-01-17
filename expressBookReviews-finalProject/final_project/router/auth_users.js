const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [
	{
		username: 'user1',
		password: 'password1',
	},
];

const isValid = (username) => {
	let userValid = users.filter((user) => {
		return user.username === username;
	});
	if (userValid.length > 0) {
		return true;
	} else {
		return false;
	}
};

const authenticatedUser = (username, password) => {
	let validusers = users.filter((user) => {
		return user.username === username && user.password === password;
	});
	if (validusers.length > 0) {
		return true;
	} else {
		return false;
	}
};

//only registered users can login
regd_users.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		return res.status(404).json({ message: 'Error logging in' });
	}

	if (authenticatedUser(username, password)) {
		let accessToken = jwt.sign(
			{
				data: password,
			},
			'access',
			{ expiresIn: 60 * 60 },
		);
		req.session.authorization = {
			accessToken,
			username,
		};
		return res.status(200).send('User successfully logged in');
	} else {
		return res
			.status(208)
			.json({ message: 'Invalid Login. Check username and password' });
	}
});

//register new user
regd_users.post('/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {
		if (!isValid(username)) {
			users.push({ username: username, password: password });
			return res
				.status(200)
				.json({ message: 'User successfully registred. Now you can login' });
		} else {
			return res.status(404).json({ message: 'User already exists!' });
		}
	}
	return res.status(404).json({ message: 'Unable to register user.' });
});

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
	const isbn = req.params.isbn;
	// const review = req.body.review;
	let book = books[isbn];
	let username = req.session.authorization.username;
	if (book) {
		let review = req.query.review;
		if (review && username) {
			book.reviews[username] = review;
			return res
				.status(200)
				.send(`Review added/updated for ${book.title} by ${username}`);
		} else {
			res.send('Review or username not provided');
		}
	} else {
		res.send('Unable to find book with that ISBN');
	}
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
	const isbn = req.params.isbn;
	const username = req.session.authorization.username;
	if (books[isbn]) {
		let book = books[isbn];
		delete book.reviews[username];
		return res.status(200).send('Review deleted');
	} else {
		return res
			.status(404)
			.json({ message: 'Book with ISBN#: ${isbn} not found' });
	}
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
