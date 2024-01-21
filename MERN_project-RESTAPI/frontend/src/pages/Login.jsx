import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';

export default function Login() {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = loginData;

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
	}, [email, password, user, isError, isSuccess, message, navigate, dispatch]);

	const handleChange = (e) => {
		setLoginData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login to start setting goals</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit}>
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
						<button type="submit" className="btn btn-block">
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	);
}
