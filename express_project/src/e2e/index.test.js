import request from 'supertest';
import express from 'express';

const app = express();

// //example using test 'hello' endpoint
// app.get('/hello', (req, res) =>
// 	res.status(200).send({ msg: 'hello testing e2e' }),
// );

// describe('hello endpoint', () => {
// 	it('should get /hello and expect 200', async () => {
// 		const res = await request(app).get('/hello');
// 		expect(res.statusCode).toBe(200);
// 		expect(res.body).toEqual({ msg: 'hello testing e2e' });
// 	});
// });

// describe('/api/auth', () => {
// 	beforeAll(() => {
// 		//run something before all tests (beforeEach would run before each test rather than the group of tests)
// 		//eg. mongoose.connect()
// 	});
// 	it('should get /api/auth and expect 200', async () => {
// 		const res = await request(app).get('/api/auth/status');
// 		expect(res.statusCode).toBe(401);
// 	});

// 	afterAll(()=>{
// 		//run something after all tests - eg. await mongoose.connection.dropDatabase(); await mongoose.connection.close();
// 	})
// });

//test create user and login flow - in unit testing we separated the testing to check each function, integration test will test all functions to check integrated flow (validationResult, matchedData, hashPassword, saving user to db)
describe('creating user and login flow test', () => {
	//beforeAll(()=>{//mongoose connect logic })

	it('should create the user', async () => {
		const res = await req(app).post('/api/users').send({
			username: 'test',
			password: 'test_password',
		});
		expect(res.statusCode).toBe(201);
	});

	//afterAll(async()=>{ await(drop + close mongoose connection logic)}) add logic
});
