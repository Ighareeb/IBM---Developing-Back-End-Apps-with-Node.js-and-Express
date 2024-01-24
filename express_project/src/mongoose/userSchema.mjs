//replace pushing to hardcoded array so that it saves users to database
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: mongoose.Schema.Types.String,
		required: true,
		unique: true,
	},
	displayName: mongoose.Schema.Types.String,
	password: { type: mongoose.Schema.Types.String, required: true },
});

//compile into model
const User = mongoose.model('User', userSchema);
export default User;
