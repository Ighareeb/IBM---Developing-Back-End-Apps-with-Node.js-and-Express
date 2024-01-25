import users from '../utils/userData.mjs';

export const getUserById = (req, res) => {
	const { findUserIndex } = req;
	const findUser = users[findUserIndex];
	if (!findUser) {
		return res.sendStatus(404);
	}
	return res.send(findUser);
};
