import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGoals, reset } from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner';

export default function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { goals, isLoading, isError, message } = useSelector(
		(state) => state.goals,
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate('/login');
		}
		dispatch(getGoals()); //fetch goals from BE and update goal state (which we are bringing into Dashboard with useSelector)

		//reset state when we unmount using cleanup function
		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Goals Dashboard</p>
			</section>
			<GoalForm />
		</>
	);
}
