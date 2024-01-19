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

app.use(errorHandler); //this now overwrites default express errorHandler
// app.use(authHandler); //so we can use JWT for authentication

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
