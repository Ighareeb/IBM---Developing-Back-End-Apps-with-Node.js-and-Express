import passport from 'passport';
import { Strategy } from 'passport-local';
import users from '../utils/userData.mjs';

//done(err, ?user, ?info) provided by passport.js
//serializing user by id in this case so req.session with have passport: {user: user.id} (you could serialize with anything you want, id is unique identifier so a better choice + data that isn't sensitive to session/going to change like a username + don't store unnecessary props in session data)
passport.serializeUser((user, done) => {
	console.log(`Inside serializeUser: ${user.id}`);
	//user accessed from verify function below
	done(null, user.id); //pass user.id so easy to search for user + this is what gets passed to deserializeUser
});

passport.deserializeUser((id, done) => {
	console.log(`Inside deserializeUser: ${id}`);
	try {
		const findUser = users.find((user) => user.id === id); //search for user in array or db
		if (!findUser) {
			throw new Error('User not found');
		}
		done(null, findUser); //user obj attaches to the request obj as req.user
	} catch (err) {
		done(err, null);
	}
});

passport.use(
	// Strategy(options: IStrategyOptionsWithRequest, verify: VerifyFunctionWithRequest): Strategy
	new Strategy(
		//options
		{ usernameField: 'username', passwordField: 'password' },
		//verify function
		//main purpose is to validate user (actually exists + client-password sent to server === user-password in db)
		//(passport searches for) function args get passed from req.body made to auth API for user authentication
		(username, password, done) => {
			try {
				const findUser = users.find((user) => {
					console.log(`Username: ${username} Password: ${password}`);
					user.username === username;
				});
				if (!findUser) {
					throw new Error('User not found');
				}
				if (findUser.password !== password) {
					throw new Error('Password incorrect');
				}
				done(null, findUser);
			} catch (err) {
				done(err, null);
			}
		},
	),
);

export default passport;
