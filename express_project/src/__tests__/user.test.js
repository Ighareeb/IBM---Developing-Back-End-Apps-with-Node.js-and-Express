import { getUserById } from '../handlers/users.mjs';
import users from '../utils/userData.mjs';

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

//used to create test suites i.e. collection of related tests
describe('get users', () => {
	it('should get user by id', () => {
		getUserById(mockReq, mockRes);
		expect(mockRes.sendStatus).not.toHaveBeenCalled();
		expect(mockRes.send).toHaveBeenCalled();
		expect(mockRes.send).toHaveBeenCalledWith(
			users[mockReq.params.findUserIndex],
		);
		expect(mockRes.send).toHaveBeenCalledTimes(1);
	});
});
