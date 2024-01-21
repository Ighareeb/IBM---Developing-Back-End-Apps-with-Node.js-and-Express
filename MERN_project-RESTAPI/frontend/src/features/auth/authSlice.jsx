//we are not really using Users as a resource in the same way as we are goals where we need CRUD functionality - just for login/out and register
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//createAsyncThunk - simplifies the process of dispatching actions as the result of asynchronous operations, such as API calls; and updates the Redux state accordingly (eg. from the server data)

import authService from './authService'; //function with axios HTTP req handling logic

//when user logins in we get a JWT token back from the server - we need to store this token in the browser (local storage) so that we can send it back to the server with each request to authenticate the user
const user = JSON.parse(localStorage.getItem('user')); //check inital state user ternary

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};
//(Register user) - async thunk function to handle registration (BE) - 2 params - user object and thunkAPI
export const register = createAsyncThunk(
	'auth/register', //prefix for generated action types (pending, fulfilled, rejected) --> dealt with in 'extraReducers since async
	//async function gets passed user object when dispatching register action from register page.
	async (user, thunkAPI) => {
		try {
			return await authService.register(user); //check authService.js where handling of HTTP req logic is written - making req and sending data + setting data in localStorage
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

//(Logout User)
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

//reducers here are normal functions - extraReducers are thunk or async functions
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload; //payload is user object
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; //for thunkAPI.rejectWithValue(message) in register async thunk function catch{}
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});
//when you create a slice automatically generates action creators FOR EACH reducer function you provide, and these are available under the actions property of the slice.

export const { reset } = authSlice.actions;
export default authSlice.reducer; // imported into store.js

//// EXAMPLE createAsyncThunk - Define the async function (2 paras)
// const fetchUserById = createAsyncThunk(
//   'users/fetchByIdStatus',  									1. str used as prefix for generated action types
//2.A payload creator function that returns a Promise. This function receives two arguments: the payload for the dispatched action and a thunkAPI object.
//   async (userId, thunkAPI) => {
//     const response = await userAPI.fetchById(userId);
//     return response.data;
//   }
// );
