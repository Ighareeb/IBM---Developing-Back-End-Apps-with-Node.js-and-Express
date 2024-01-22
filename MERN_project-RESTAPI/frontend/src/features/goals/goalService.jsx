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

//get user goals
const getGoals = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.get(API_URL, config);

	return res.data;
};

const deleteGoal = async (goalId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	await axios.delete(API_URL + goalId, config);
	return goalId;
	//could do it this way but make sure to change fulfilled case in extraReducers to action.payload.id in goalSlice
	// const res = await axios.delete(API_URL + goalId, config);
	// return res.data;
};

const goalService = { createGoal, getGoals, deleteGoal };
export default goalService;
