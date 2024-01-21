//we are not really using Users as a resource in the same way as we are goals where we need CRUD functionality - just for login/out and register
import React, { useState } from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//createAsyncThunk - simplifies the process of dispatching actions as the result of asynchronous operations, such as API calls; and updates the Redux state accordingly (eg. from the server data)

//when user logins in we get a JWT token back from the server - we need to store this token in the browser (local storage) so that we can send it back to the server with each request to authenticate the user
const user = JSON.parse(localStorage.getItem('user')); //check inital state user ternary

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

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
	extraReducers: () => {},
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
