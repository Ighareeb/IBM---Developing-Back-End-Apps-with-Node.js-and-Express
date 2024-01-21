import axios from 'axios';

const API_URL = '/api/goals/';

//create new goals
const createGoal = async (goalData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`, //token stored in localStorage is just token, we need to send it as bearer token
		},
	};
	const res = await axios.post(API_URL, goalData, config);

	return res.data;
};

const goalService = { createGoal };
export default goalService;
