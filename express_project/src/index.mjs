import express from 'express';

const app = express();

//GET req with route, req/res objects passed in handler function
app.get('/', (req, res) => {
	res.status(200).send({ msg: 'Homepage' });
});

const users = [
	{
		id: 1,
		username: 'IG',
	},
	{
		id: 2,
		username: 'TG',
	},
	{
		id: 3,
		username: 'SJ',
	},
];

app.get('/api/users', (req, res) => {
	// console.log(req.query);
	const {
		query: { key, value },
	} = req; //destructuring query object from req object + filter key & value from query object

	if (key && value) {
		return res
			.status(200)
			.send(
				users.filter((user) =>
					String(user[key]).toLowerCase().includes(String(value).toLowerCase()),
				),
			); //filter users based on key and value - returns filtered array
		//eg. http://localhost:3000/api/users?key=username&value=IG
	}
	return res.status(200).send(users);
});

app.post('/api/users', (req, res) => {
	res.status(200).send({ msg: 'User created' });
});
//route params are always treated as strings so for id we need to convert to number parseInt()/Number()
app.get('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		res.status(404).send({ msg: 'Bad request, Invalid ID' });
	}
	const user = users.find((user) => user.id === parseInt(id));
	if (user) {
		res.status(200).send({ user: user.username, id: id });
	} else {
		res.status(404).send({ msg: 'User not found' });
	}
});

app.get('/api/products', (req, res) => {
	res.status(200).send({ msg: 'Products' });
});

const PORT = process.env.PORT || 3000;
//returns node http.Server (express server) to start listening on port for HTTP requests
app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});
