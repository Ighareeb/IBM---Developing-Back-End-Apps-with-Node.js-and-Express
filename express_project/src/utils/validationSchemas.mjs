export const userValidationSchema = {
	username: {
		isLength: {
			options: { min: 5, max: 32 },
			errorMessage: 'Username must be between 5 and 32 characters',
		},
		notEmpty: {
			options: true,
			errorMessage: 'Username required',
		},
		isString: {
			options: true,
			errorMessage: 'Username must be a string',
		},
	},
};
// replace error-validation middleware arg with checkSchema(userValidationSchema) after importing both into the index.js file
