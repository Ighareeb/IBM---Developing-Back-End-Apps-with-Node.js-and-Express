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
			//thunkAPI obj has getState() method that returns current state where we have the user object and can get token to use when accessing protected routes
			return await goalService.createGoal(
				goalData,
				thunkAPI.getState().auth.user.token,
			);
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
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals.push(action.payload); //since goals is an array - redux allows us to just push onto state.
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
