// //Example - sending an HTTP request
// const http = require('http');
// let options = {
// 	host: 'w1.weather.gov',
// 	path: '/xml/current_obs/XSFO.xml',
// };
// //http.request(options, [callback]); this method returns an instance of http.ClientRequest
// //callback is called once res is receieved and passes response object
// let request = http.request(options, (res) => {
// 	let buffer = '';
// 	let result = '';
// 	//object.on() is a method used to define event listeners/handlers that gets called when event occurs
// 	res.on('data', (chunk) => {
// 		buffer += chunk;
// 	});
// 	res.on('end', () => {
// 		console.log(buffer);
// 	});
// });
// request.on('error', (err) => {
// 	console.error(err.message);
// });
// request.end();
//------------------------------------------------------------------
// //Example - Async/Await
// const axios = require('axios');

// const connectToURL = (url) => {
// 	const req = axios.get(url); //send get req; returns promise
// 	console.log(req);
// 	req
// 		.then((res) => {
// 			let listOfEntries = res.data.entries;
// 			listOfEntries.forEach((entry) => {
// 				console.log(entry.Category);
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err.message);
// 		});
// };
// console.log('Before connect URL');
// connectToURL('https://api.publicapis.org/entries');
// console.log('After connect URL');
// //Same example using async/await
// const connectToURLasync = async (url) => {
// 	const outcome = axios.get(url);
// 	let listOfEntries2 = (await outcome).data.entries;
// 	listOfEntries2.forEach((entry) => {
// 		console.log(entry.Category);
// 	});
// };
// connectToURLasync('https://api.publicapis.org/entries');
//------------------------------------------------------------------
// //Example -  simple express server
// const express = require('express');
// const app = express(); //create instance (obj) of express framework API
// //use {app} to set up your server, define routes, and listen for incoming requests.
// const port = 3000;
// app.get('/', (req, req) => {
// 	//logic
// });
// //start-create instance of HTTP server to listen for incoming requests
// let server = app.listen(port, () => {
// 	console.log(`Server is listening on URL http://localhost:${port}`);
// });
//------------------------------------------------------------------
// //Example - express route handling (at app level)
// const express = require('express');
// const app = express();

// app.get('users/about/:id', req, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// app.post('users/about/:id', res, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// app.get('item/about/:id', req, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// app.post('item/about/:id', res, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// app.listen(3000, () => {
// 	console.log('Server is listening on port 3000');
// });
//------------------------------------------------------------------
// //Example - express route handling (at Router level)
// const express = require('express');
// const app = express();
// //create a router instance which can be mounted as middleware, used to define routes in modular way.
// let userRouter = express.Router();
// app.use('/users', userRouter); //app.use mounts the router to the base route path
// let itemRouter = express.Router();
// app.use('/item', itemRouter);

// userRouter.get('/about/:id', req, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// userRouter.post('/about/:id', res, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// itemRouter.get('/about/:id', req, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// itemRouter.post('/about/:id', res, (res) => {
// 	res.send('Response about user ' + req.params.id);
// });
// app.listen(3000, () => {
// 	console.log('Server is listening on port 3000');
// });
//------------------------------------------------------------------
// //Example - express error handling
// const express = require('express');
// const app = express();
// app.use('/user/:id', (req, res, next) => {
// 	if (req.params.id === 1) {
// 		throw new Error('Trying to access admin login');
// 	} else {
// 		next();
// 	}
// });
// app.use((err, req, res, next) => {
// 	if (err !== null) {
// 		res.status(500).send(err.toString());
// 	} else {
// 		next();
// 	}
// });
// app.get('/user/:id', (req, res) => {
// 	return res.send('Hello! User Id ' + req.params.id);
// });

// app.listen(3000, () => {
// 	console.log('Server is listening on port 3000');
// });
//------------------------------------------------------------------
// //Example - express built-in middleware
// const express = require('express');
// const app = express();
// app.use(express.static(`${fileName_path}`))
// app.listen(3000, () => {
// 	console.log('Server is listening on port 3000');
// });
//------------------------------------------------------------------
// //Example - Template rendering (rendering dynamic content with express + react)
// const express = require('express');
// const app = express();
// // import the express-react-views module, which is a JSX view engine for Express.
// const expressReactViews = require('express-react-views');
// //create a new instance of the JSX view engine.
// const jsxEngine = expressReactViews.createEngine();
// //set the view engine to use the JSX view engine
// app.set('view engine', 'jsx');
// //set the view directory to myviews. Express will look for JSX files in the dir when res.render is called
// app.set('view', 'myviews');
// //register the JSX view engine instance with express
// app.engine('jsx', jsxEngine);
// //setup route handler
// app.get('/:name', (req, res) => {
// 	res.render('index', { name: req.params.name });
// });
// app.listen(3000, () => {
// 	console.log('Server is listening on port 3000');
// });
//------------------------------------------------------------------
// //Example Authentication
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');

const app = express();
//note: JWT secret should always be generated using a password generator and stored in config file as env variable not hard-coded like this example.
const JWT_SECRET = 'secretString';
app.use(express.json());
//create endpoint for user API
app.get('/user', (req, res) => {
	let tkn = req.header('Authorization');
	if (!tkn) return res.status.send('No Token');
	if (tkn.startsWith('Bearer ')) {
		tokenValue = tkn.slice(7, tkn.length).trimLeft();
	}
	try {
		const verificationStatus = jsonwebtoken.verify(tokenValue, JWT_SECRET);
		if (verificationStatus.user === 'user') {
			return res.status(200).json('User is authenticated');
		}
	} catch {
		return res.status(401).json({ message: 'Please login to access resource' });
	}
});
app.post('/signin', (req, res) => {
	//compare username, password from the reqquest body with values fetched from db
	//if they match JWT is generated using jsonwebtoken.sign()
	const { username, password } = req.body;
	if (username === 'user' && password === 'password') {
		return res.json({
			token: jsonwebtoken.sign({ user: 'user' }, JWT_SECRET),
		});
	}
	return res.status(201).json({ message: 'Invalid username and/or password' });
});
app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
