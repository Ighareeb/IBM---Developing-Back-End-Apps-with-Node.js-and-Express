import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; //need to access state to import user to be able to conditional render
import { logout, reset } from '../features/auth/authSlice'; //import logout and reset functions from authSlice.js file
export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout()); //dispatch logout thunk function action
		dispatch(reset()); //reset state
		navigate('/');
	};
	return (
		<header className="header">
			<div className="logo">
				<Link to="/">Goal Setter</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className="btn" onClick={onLogout}>
							<FaSignOutAlt />
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to="/login">
								<FaSignInAlt />
								Login
							</Link>
						</li>
						<li>
							<Link to="/register">
								<FaUser />
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}
