import passport from 'passport';
import { Strategy } from 'passport-discord';
import dotenv from 'dotenv';
dotenv.config();
import { discordUser } from './mongoose/discordUserSchema.mjs'; //used to search for user in db using discordId

//serialize the user (in this case specifically user.id) into the session obj
passport.serializeUser((user, done) => {
	console.log(`Inside serializeUser: ${user.id}`);
	console.log(user);
	return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	console.log(`Inside deserializeUser: ${id}`);
	try {
		const findUser = await discordUser.findById(id);
		if (!findUser) {
			throw new Error('User not found');
		}
		return done(null, findUser);
	} catch (err) {
		return done(err, null);
	}
});

export default passport.use(
	new Strategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL, //i.e redirect URL
			//<scope>:state what permissions we want to access from client/user
			scope: ['identify', 'email', 'guilds'],
		},
		//verify function does validation on user. Since they are using 3rd party login we don't need to check password - focus on the user data and whether it is on our db or not.
		//<profile> is the user obj with eg email, username, etc
		//tokens (would be stored on db) are what you would use to make requests to the API on behalf of the user

		//accessToken (main token used) are short lived and refreshed by the refreshToken
		async (accessToken, refreshToken, profile, done) => {
			let findUser;

			try {
				findUser = await discordUser.findOne({
					discordId: profile.id,
				});
			} catch (err) {
				return done(err, null);
			}

			try {
				if (!findUser) {
					const newUser = new discordUser({
						username: profile.username,
						discordId: profile.id,
					});
					const savedUser = await newUser.save();
					return done(null, savedUser);
				}
				return done(null, findUser); //this is the user obj passed to serializeUser function
			} catch (err) {
				console.log(err);
				return done(err, null);
			}
		},
	),
);
