import users from '../utils/userData.mjs';

//custom middleware that can be added to the routes to refactor and reduce DRY code
export const handleUserById = (req, res, next) => {
	const id = parseInt(req.params.id);
	const { body } = req;
	if (isNaN(id)) {
		return res.status(400).send({ msg: 'Bad request, Invalid ID' });
	}
	const userIndex = users.findIndex((user) => {
		user.id === id;
	});
	if (userIndex === -1) {
		return res.status(404).send({ msg: 'User not found' });
	}
	// need to pass the userIndex to the next middleware or in this case the route req,res handler
	req.userIndex = userIndex;
	// note still need to destructure req.body in req, res handler to use body data
	next();
};

export default handleUserById;
//-------------------------------------------------------------------------------------------
//  REFACTORED EXAMPLE using middleware
// app.put('/api/users/:id', handleUserById, (req, res) => {
// 	const { body, (userIndex) } = req; // --> could destructure userIndex as it is passed from middleware
// 	if (!body) {
// 		return res.status(400).send({ msg: 'Bad request, body required' });
// 	}
// 	const updatedUser = { id: users[req.userIndex].id, ...body };
// 	users[req.userIndex] = updatedUser; //updates user in the users array
// 	return res.status(200).send(updatedUser);
// });

// ------------------------------------------------------------------------------------------
