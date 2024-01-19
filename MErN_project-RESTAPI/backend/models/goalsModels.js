//define goals schema - props/fields for this resource
const mongoose = require('mongoose');
//after defining userSchema need to associate goals with user
const goalSchema = mongoose.Schema(
	{
		user: {
			//when mongoose automatically generates _id for any new resource we create it is the object id which we want to be the type for the user
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			//need to add reference so we know which model the ObjectId refers to
			ref: 'User', //name of model for ref so they are asssociated with a goal.
		},
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{
		timestamps: true, // tells mongoose to automatically manage createdAt and updatedAt props/field on your documents.
	},
);

module.exports = mongoose.model('Goal', goalSchema);
//import to controller
