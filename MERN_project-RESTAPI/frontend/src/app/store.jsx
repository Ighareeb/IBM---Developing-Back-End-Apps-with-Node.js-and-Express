import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; //brings the authSlice.reducer since it is default export
import goalReducer from '../features/goals/goalSlice'; //brings the goalSlice.reducer since it is default export

export const store = configureStore({
	reducer: { auth: authReducer, goals: goalReducer },
});

//imported in index.js - we add reducer from {<fileName>slice.js} and add it to store
// import { configureStore } from '@reduxjs/toolkit';

//-----------------------------------------------
//we will not be using this reducer - we will create user + goal reducers for our app
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
