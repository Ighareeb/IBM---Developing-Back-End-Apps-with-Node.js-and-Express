import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createGoal = createAsyncThunk(
	'goals/create',
	async (goalData, thunkAPI) => {
		try {
			return await goalService.create(goalData);
		} catch (err) {
			const message =
				(err.response & err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const goalSlice = createSlice({
	name: 'goal',
	initialState,
	reducer: {
		reset: (state) => initialState, //reset clears goal array, unlike with user reset where we want to persist so we don't include user: value from the state object
	},
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
