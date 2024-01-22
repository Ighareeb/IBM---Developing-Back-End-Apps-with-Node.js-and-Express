import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
	return (
		<>
			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
// #NOTES

// Will not be using the counter in this project - left as example
// --> Create userSlice.js + goalSlice.js that have reducers we add to store.js

// For the App we need 3 pages in src folder - Login, Register, Dashboard (that you need to be logged in to access)

//thunk returns a function in a promise and I create reducers in my slice to handle the state of the promise
//in my components I would initialize useDispatch and dispatch the thunk function/actions to thje Redux store which will run asynchoronously

//useSelector hook allows extraction of data from Redux store state (takes entire redux store state as arg obj) and return part of state you want to use.
//in store we are getting state imported from our authSlice for users and goalSlice for goals
