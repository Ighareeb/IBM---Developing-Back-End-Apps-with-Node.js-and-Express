import users from '../utils/userData.mjs';
import { validationSchema } from './utils/validationSchemas.mjs';
import { validationResult, matchedData } from 'express-validator';
import { User } from './mongoose/userSchema.mjs';
import { hashPassword } from '../utils/hash.mjs';

export const getUserById = (req, res) => {
	const { findUserIndex } = req;
	const findUser = users[findUserIndex];
	if (!findUser) {
		return res.sendStatus(404);
	}
	return res.send(findUser);
};

export const createUser = async (req, res) => {
	const result = validationResult(req);
	console.log(result);
	if (!result.isEmpty()) {
		return res.status(400).send({ errors: result.array() }); //returns array of validation errors - can be mapped and display specific errors/info to user in response
	}
	const validData = matchedData(req); //returns only validated data from req body
	validData.password = await hashPassword(validData.password);
	console.log(validData);
	const newUser = new User(validData);
	try {
		const savedUser = await newUser.save();
		return res.status(201).send(savedUser);
	} catch (err) {
		console.log(err);
		return res.sendStatus(400);
	}
};
