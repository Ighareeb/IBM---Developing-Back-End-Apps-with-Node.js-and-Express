import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

export default function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '', //confirm password
	});

	const { name, email, password, password2 } = formData;

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
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
