//define goals schema - props/fields for this resource
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
	{
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
