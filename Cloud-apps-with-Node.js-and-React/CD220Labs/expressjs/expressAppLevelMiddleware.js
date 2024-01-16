const express = require('express');
const app = new express();

//middlware that gets executed for every request and check password
app.use(function (req, res, next) {
	if (req.query.password !== 'pwd123') {
		return res.status(402).send('This user cannot login ');
	}
	console.log('Time:', Date.now());
	next();
});
// curl localhost:3333/home?password=pwd123
app.get('/home', (req, res) => {
	return res.send('Hello World!');
});

app.listen(3333, () => {
	console.log(`listening at http://localhost:3333`);
});
