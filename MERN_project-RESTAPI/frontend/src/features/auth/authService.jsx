import axios from 'axios'; //for HTTP req --> POSTMAN for server side / axios for client side

const API_URL = '/api/users/'; //prefix for url is kept in package.json proxy property

//register user function
const register = async (userData) => {
	const res = await axios.post(API_URL, userData);

	if (res.data) {
		//axios puts data inside data object in the response
		localStorage.setItem('user', JSON.stringify(res.data));
	}
	return res.data;
};

const authService = { register };

export default authService;
