const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const PORT = 5000;
// tells app to use session middleware - secret = random unique string key used to authenticate session; resave = enables session to be stored in session store (even if not modified); saveUninitialized = allows any unitialized session to be saved in store (i.e. when session created but not modified it is 'uninitialized' - both bool default as true but default is deprecated so set bool values.)
app.use(
	session({ secret: 'fingerpint', resave: true, saveUninitialized: true }),
);

app.use(express.json());

app.use('/user', (req, res, next) => {
	// Middleware which tells that the user is authenticated or not
	// retrieves authentication details from the session and verifies.
	if (req.session.authorization) {
		let token = req.session.authorization['accessToken']; // Access Token
		//check if token is validated
		jwt.verify(token, 'access', (err, user) => {
			if (!err) {
				req.user = user; //since user is authenitcated control sent to next endpoint handler
				next();
			} else {
				return res.status(403).json({ message: 'User not authenticated' });
			}
		});
	} else {
		return res.status(403).json({ message: 'User not logged in' });
	}
});

app.use('/user', routes);

app.post('/login', (req, res) => {
	const user = req.body.user;
	if (!user) {
		return res.status(404).json({ message: 'Body Empty' });
	}
	let accessToken = jwt.sign(
		{
			data: user,
		},
		'access',
		{ expiresIn: 60 * 60 }, //access token valid for specified time (1 hour - (seconds))
	);

	req.session.authorization = {
		//set access token into the session obj to ensure only authenticated users can access endpoint
		accessToken,
	};
	return res.status(200).send('User successfully logged in');
});

//create endpoint for getting all users with particular lastName
router.get('/lastName/:lastName', (req, res) => {
	const lastName = req.params.lastName;
	let filtered_lastName = users.filter((user) => user.lastName === lastName);
	res.send(filtered_lastName);
});

//create endpoint for sorting users by DOB
router.get('/sort', (req, res) => {
	let sorted_users = users.sort((a, b) => {
		let d1 = getDateFromString(a.DOB);
		let d2 = getDateFromString(b.DOB);
		return d1 - d2;
	});
	res.send(sorted_users);
});
app.listen(PORT, () => console.log('Server is running at port ' + PORT));
