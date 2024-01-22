const path = require('path'); //built in Node.js module
const express = require('express'); //BE web framework
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware');
const authHandler = require('./middleware/authMiddleware');
const connectDB = require('./config/db');
const colors = require('colors'); // adds colors to Node.js console eg. change text/background cololr, apply themes, create custom styles

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //Middleware that parses incoming req that have JSON payloads and result in to req.body

app.use(express.urlencoded({ extended: false })); //Middleware that parses req that have urlencoded paylods (typically how browsers send form data set to POST) and result is req.body

app.use('/api/goals', require('./routes/goalRoutes')); //goals endpoint
app.use('/api/users', require('./routes/userRoutes')); //users endpoint

//-----------------------------------
//BE using express for dev server
//FE dev server is just for development -  so we need to build FE (npm run build) for React --> creates build folder with static assets. This becomes entry point for FE that we need to point to.
//serve FE

if (process.env.NODE_ENV === 'production') {
	//serve static folder i.e. build folder for React
	app.use(express.static(path.join(__dirname, '../frontend/build'))); //build folder created when we run <npm run build>; ( __dirname is current directory )

	//serve index.html file from build folder. we have already 'pointed' our api routes in above code so here we are pointing any other routes to our index.html file
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'),
		);
	});
} else {
	app.get('/', (req, res) => {
		res.send('Need to set to production mode in NODE_ENV to serve FE');
	});
}
//-----------------------------------
app.use(errorHandler); //this now overwrites default express errorHandler
// app.use(authHandler); //so we can use JWT for authentication

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
