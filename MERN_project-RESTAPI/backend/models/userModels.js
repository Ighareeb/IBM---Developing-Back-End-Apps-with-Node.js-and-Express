const mongoose = require('mongoose');

//Schema: define fields we want user to have in our database
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
	},
	{
		timestamps: true, // tells mongoose to automatically manage createdAt and updatedAt props/field on your documents.
	},
);

module.exports = mongoose.model('User', userSchema); //import to controller
