//error middleware(functions that execute during the req/res cycle) - we want to overwrite default express error handler
const errorHandler = (err, req, res, next) => {
	//res.statusCode is being set in the controller functions(res.status)
	const statusCode = res.statusCode ? res.statusCode : 500;

	res.status(statusCode);

	res.json({
		message: err.message,
		//stack info only when .env - NODE_ENV is set to development mode
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = errorHandler;
//import in server.js
