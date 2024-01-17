const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const routes = require('./router/friends.js');

let users = [];

//1a - Helper/utility function and not an endpoint function -  You need to provide a manner in which it can be checked to see if the username exists in the list of registered users, to avoid duplications and keep the username unique This is a .
const doesExist = (username) => {
	let userswithsamename = users.filter((user) => {
		return user.username === username;
	});
	if (userswithsamename.length > 0) {
		return true;
	} else {
		return false;
	}
};

//1b - This is also a utility function and not an endpoint. You will next check if the username and password match what you have in the list of registered users. It returns a boolean depending on whether the credentials match or not.
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

const app = express();
//2. reate and use a session object with user-defined secret, as a middleware to intercept the requests and ensure that the session is valid before processing the request.
app.use(
	session(
		{ secret: 'fingerpint' }, //'fingerprint' is the secret string used to sign the session ID cookie.
		(resave = true),
		(saveUninitialized = true),
	),
);

app.use(express.json());

//You will now ensure that all operations restricted to auhtenticated users are intercepted by the middleware. The following code ensures that all the endpoints starting with /friends go through the middleware. It retrieves the authorization details from the session and verifies it. If the token is validated, the user is aunteticated and the control is passed on to the next endpoint handler. If the token is invalid, the user is not authenticated and an error message is returned.
app.use('/friends', function auth(req, res, next) {
	if (req.session.authorization) {
		token = req.session.authorization['accessToken'];
		jwt.verify(token, 'access', (err, user) => {
			if (!err) {
				req.user = user;
				next();
			} else {
				return res.status(403).json({ message: 'User not authenticated' });
			}
		});
	} else {
		return res.status(403).json({ message: 'User not logged in' });
	}
});

//3. You will provide an endpoint for the registered users to login. This endpoint will do the following:
// Return an error if the username or password is not provided.
// Creates an access token that is valid for 1 hour (60 X 60 seconds) and logs the user in, if the credentials are correct.
// Throws an error, if the credentials are incorrect.
app.post('/login', (req, res) => {
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

//1. intent of this app is to provide access to the API endpoints only to the authenticated users, you need to provide a way to register the users. This endpoint will be a post request that accepts username and password through the body. The user doesn’t have to be authenticated to access this endpoint.
app.post('/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {
		if (!doesExist(username)) {
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

const PORT = 5000;

app.use('/friends', routes);

app.listen(PORT, () => console.log('Server is running'));
