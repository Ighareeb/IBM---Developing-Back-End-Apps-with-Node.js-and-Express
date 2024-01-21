import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; //useSelector === select something from state set in authReducer (from store.js--> authSlice.js file ); useDispatch === dispatch an function/action (reset, thunk actions/reducers in authSlice.js) to the store
import { useNavigate } from 'react-router-dom'; //for redirecting
import { toast } from 'react-toastify'; //for toast notifications - need to update App.js for this to work
import { register, reset } from '../features/auth/authSlice'; //import register and reset functions from authSlice.js file
import Spinner from '../components/Spinner'; //import Spinner component for isLoading

export default function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth,
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		//dispatch register
		if (password !== password2) {
			toast.error('Passwords do not match');
		} else {
			const userData = {
				name,
				email,
				password,
			};
			dispatch(register(userData)); //dispatch register thunk function action
		}
	};

	//if isLoading is true, show spinner
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser />
					Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className="form">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							value={name}
							name="name"
							id="name"
							className="form-control"
							placeholder="Enter your name"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							value={email}
							name="email"
							id="email"
							className="form-control"
							placeholder="Enter your email"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							value={password}
							name="password"
							id="password"
							className="form-control"
							placeholder="Enter your password"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							value={password2}
							name="password2"
							id="password2"
							className="form-control"
							placeholder="Confirm your password"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
}
