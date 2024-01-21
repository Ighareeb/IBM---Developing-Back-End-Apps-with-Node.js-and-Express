import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
	return (
		<>
			<Router>
				<div class="container">
					<Header />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
// #NOTES

// Will not be using the counter in this project - left as example
// --> Create userSlice.js + goalSlice.js that have reducers we add to store.js

// For the App we need 3 pages in src folder - Login, Register, Dashboard (that you need to be logged in to access)
