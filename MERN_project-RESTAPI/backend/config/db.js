const mongoose = require('mongoose');
//all mongoose methods are asynchronous and return promises
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(
			`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold,
		);
	} catch (err) {
		console.log(err);
		process.exit(1); //exit process with failure
	}
};

module.exports = connectDB; //import in server.js
