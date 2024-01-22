import React from 'react';

export default function GoalItem({ goal }) {
	return (
		<div className="goal">
			<div>{new Date(goal.createdAt).toLocaleString('en-GB')}</div>
			<h2>{goal.text}</h2>
			<button className="close">X</button>
		</div>
	);
}
