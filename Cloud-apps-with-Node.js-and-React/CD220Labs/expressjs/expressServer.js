const express = require('express');
const app = new express();

let loginDetails = [];

app.get('/', (req, res) => {
	res.send('Welcome to the express server');
});

app.get('/loginDetails', (req, res) => {
	res.send(JSON.stringify(loginDetails));
});

app.post('/login/:name', (req, res) => {
	loginDetails.push({ name: req.params.name, login_time: new Date() });
	res.send(req.params.name + ', You are logged in!');
});

app.get('/:name', (req, res) => {
	res.send('Hello ' + req.params.name);
});

//added end point which will fetch a particular month from a list and return it to user
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'Auguest',
	'September',
	'October',
	'November',
	'December',
];
app.get('/fetchMonth/:num', (req, res) => {
	let num = parseInt(req.params.num);
	if (num < 1 || num > 12) {
		res.send('Not a valid month number');
	} else {
		res.send(months[num - 1]);
	}
});

app.listen(3333, () => {
	console.log(`Listening at http://localhost:3333`);
});
