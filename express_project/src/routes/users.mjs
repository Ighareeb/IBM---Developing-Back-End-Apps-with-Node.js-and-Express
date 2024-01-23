import { Router } from 'express';
import users from './utils/userData.mjs';
import { query, validationResult, checkSchema } from 'express-validator';
import { validationSchema } from './utils/validationSchemas.mjs';

const router = Router();

//GET all users + if query params will filter + query param express-validator
router.get('/api/users', (req, res) => {
	console.log(req); //check validation object
	const result = validationResult(req); // extracts validation errors from validation obj (so you don't need to do it manually)
	console.log(result); //returns in easily readable format ready to be used as required in res
	// console.log(req.query);
	const {
		query: { key, value },
	} = req; //destructuring query object from req object + filter key & value from query object

	if (key && value) {
		return res
			.status(200)
			.send(
				users.filter((user) =>
					String(user[key]).toLowerCase().includes(String(value).toLowerCase()),
				),
			); //filter users based on key and value - returns filtered array
		//eg. http://localhost:3000/api/users?key=username&value=IG
	}
	return res.status(200).send(users);
});

//POST create new user + body express-validator + isEmpty() & matchedData()
router.post(
	'/api/users',
	body('username')
		.notEmpty()
		.withMessage('Username required')
		.isLength({ min: 5, max: 32 })
		.withMessage('Username must be between 5 and 32 characters')
		.isString()
		.withMessage('Username must be a string'),
	(req, res) => {
		const result = validationResult(req);
		console.log(result);
		if (!result.isEmpty()) {
			return res.status(400).send({ errors: result.array() }); //returns array of validation errors - can be mapped and display specific errors/info to user in response
		}
		// const { body } = req;
		// const newUser = { id: users.length + 1, ...body };
		const validData = matchedData(req); //returns only validated data from req
		const newUser = { id: users.length + 1, ...validData };
		users.push(newUser);
		res.status(201).send(newUser);
	},
);

export default router;
//then import into index.mjs
