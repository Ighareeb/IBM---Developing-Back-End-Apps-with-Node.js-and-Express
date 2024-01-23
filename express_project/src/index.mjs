import express from 'express';

const app = express();

//MIDDLEWARE
app.use(express.json()); //built in express middleware that parses JSON data from req.body

const loggingMiddleware = (req, res, next) => {
	console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
	next();
};
app.use(loggingMiddleware); //calling middleware globally like this means it will be called for all routes

// //custom middleware that can be added to the routes to refactor and reduce DRY code
// const handleUserById = (req, res, next)=> {
// 	const id = parseInt(req.params.id);
// 	const {body} = req;
// 	if (inNaN(id)) {
// 		return res.status(400).send({ msg: 'Bad request, Invalid ID' });
// 	}
// 	const userIndex = users.findIndex((user)=>{user.id === id});
// // need to pass the userIndex to the next middleware or in this case the route req,res handler
//  req.userIndex = userIndex;

//note still need to destructure req.body in req, res handler to use body data
// }
// //  REFACTORED EXAMPLE using middleware
// app.put('/api/users/:id', handleUserById, (req, res) => {
// 	const { body, (userIndex) } = req; --> could destructure userIndex as it is passed from middleware
// 	if (!body) {
// 		return res.status(400).send({ msg: 'Bad request, body required' });
// 	}
// 	const updatedUser = { id: users[req.userIndex].id, ...body };
// 	users[req.userIndex] = updatedUser; //updates user in the users array
// 	return res.status(200).send(updatedUser);
// });

//------------------------------------------------------------------------------------------
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
//GET all users + if query params will filter
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
//POST create new user
app.post('/api/users', (req, res) => {
	const { body } = req;
	const newUser = { id: users.length + 1, ...body };
	users.push(newUser);
	res.status(201).send(newUser);
});

//GET single user using id
//route params are always treated as strings so for id we need to convert to number parseInt()/Number()
app.get('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res.status(400).send({ msg: 'Bad request, Invalid ID' });
	}
	const user = users.find((user) => user.id === id);
	if (user) {
		return res.status(200).send({ username: user.username, id: id });
	} else {
		return res.status(404).send({ msg: 'User not found' });
	}
});

//PUT update user based on id route param
app.put('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { body } = req;
	if (isNaN(id)) {
		return res.status(400).send({ msg: 'Bad request, Invalid ID' });
	}
	const userIndex = users.findIndex((user) => user.id === id);
	if (userIndex !== -1 && body) {
		const updatedUser = { id: id, ...body };
		users[userIndex] = updatedUser; //updates user in the users array
		return res.status(200).send(updatedUser);
	}
	return res.status(404).send({ msg: 'User not found' });
});

//PATCH (partial) update user based on id route param
app.patch('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { body } = req;
	if (isNaN(id)) {
		return res.status(400).send({ msg: 'Bad request, Invalid ID' });
	}
	const userIndex = users.findIndex((user) => user.id === id);
	if (userIndex === -1) {
		return res.status(404).send({ msg: 'User not found' });
	}
	const updatedUser = { ...users[userIndex], ...body }; //only overwrites props/fields in req.body that are present in user
	users[userIndex] = updatedUser; //updates user in the users array
	return res.status(200).send(updatedUser);
});

//DELETE user based on id route param
app.delete('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res.status(400).send({ msg: 'Bad request, Invalid ID' });
	}
	const userIndex = users.findIndex((user) => user.id === id);
	if (userIndex === -1) {
		return res.status(404).send({ msg: 'User not found' });
	}
	const deletedUser = users.splice(userIndex, 1);
	return res.status(200).send(deletedUser);
});

//GET all products
app.get('/api/products', (req, res) => {
	res.status(200).send({ msg: 'Products' });
});

const PORT = process.env.PORT || 3000;
//returns node http.Server (express server) to start listening on port for HTTP requests
app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});
