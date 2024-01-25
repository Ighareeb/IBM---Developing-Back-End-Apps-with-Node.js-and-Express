import { getUserById, createUser } from '../handlers/users.mjs'; // check this file for the functions that are being tested
import users from '../utils/userData.mjs';
import * as validator from 'express-validator';
import * as helpers from '../utils/hash.mjs';
import { User } from '../mongoose/userSchema.mjs';

//note each of the callbacks are returning obj that is why () used and no return statement.
jest.mock('express-validator', () => ({
	validationResult: jest.fn(() => ({
		isEmpty: jest.fn(() => false),
		array: jest.fn(() => [{ msg: 'Invalid Field' }]),
	})),
	matchedData: jest.fn(() => ({
		username: 'test',
		password: 'password',
		status: jest.fn(() => {
			return mockRes; //need to return mockRes in order to use mockRes.send (since res is chained)
		}),
	})),
}));

jest.mock('../utils/hash.mjs', () => ({
	hashPassword: jest.fn((password) => `hashed_${password}`),
}));

jest.mock('../mongoose/userSchema.mjs');

const mockReq = {
	params: {
		findUserIndex: 1,
	},
};
const mockRes = {
	//jest.fn()Creates a mock function
	sendStatus: jest.fn(),
	send: jest.fn(),
};

//unit test for getUserById handler
describe('get users', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should get user by id', () => {
		getUserById(mockReq, mockRes);

		expect(mockRes.send).toHaveBeenCalled();
		expect(mockRes.send).toHaveBeenCalledWith(
			users[mockReq.params.findUserIndex],
		);
		expect(mockRes.send).toHaveBeenCalledTimes(1);
	});
	it('should call sendStatus with 404 when user not found', () => {
		const copyMockReq = { ...mockReq, findIndex: 100 };
		getUserById(copyMockReq, mockRes);
		expect(mockRes.sendStatus).toHaveBeenCalled();
		expect(mockRes.sendStatus).toHaveBeenCalledWith(404);
		expect(mockRes.send).not.toHaveBeenCalled();
	});
});

//unit test for createUser handler
describe('create users', () => {
	const mockReq = {};

	it('should return status of 400 when there are errors', async () => {
		await createUser(mockReq, mockRes);
		expect(validator.validationResult).toHaveBeenCalled();
		expect(validator.validationResult).toHaveBeenCalledWith(mockReq);
		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.send).toHaveBeenCalledWith([{ msg: 'Invalid Field' }]);
	});

	it('should return status of 201 when user is created', async () => {
		//override mock value of validation result to true to test matchedData since createUser handler will be called with matchedData
		jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
			isEmpty: jest.fn(() => true),
		}));
		const saveMethod = jest
			.spyOn(User.prototype, 'save')
			.mockResolvedValueOnce({
				id: 1,
				username: 'test',
				password: 'hashed_password',
			});
		await createUser(mockReq, mockRes);
		expect(validator.matchedData).toHaveBeenCalledWith(mockReq);
		expect(helpers.hashPassword).toHaveBeenCalledWith('password');
		expect(User).toHaveBeenCalledWith({
			username: 'test',
			password: 'hashed_password', //from mockFunction
		});
		expect(saveMethod).toHaveBeenCalled();
		expect(mockRes.status).toHaveBeenCalledWith(201);
		expect(mockRes.send).toHaveBeenCalledWith({
			id: 1,
			username: 'test',
			password: 'hashed_password',
		});
	});

	it('should return status of 400 when db fails to save user', async () => {
		jest
			.spyOn(validator, 'validationResult')
			.mockImplementationOnce(() => ({ isEmpty: jest.fn(() => true) }));
		const saveMethod = jest
			.spyOn(User.prototype, 'save')
			.mockImplementationOnce(() => Promise.reject('failed to save user'));
		await createUser(mockReq, mockRes);
		expect(saveMethod).toHaveBeenCalled();
		expect(mockRes.sendStatus).toHaveBeenCalledWith(400);
	});
});
