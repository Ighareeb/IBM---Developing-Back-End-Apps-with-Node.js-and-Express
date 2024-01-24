import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
	//generate salt asynchronously. salt is combined with pw and then hashed together - the # of rounds is the computational cost of the hash function (higher = more secure but slower)
	const salt = await bcrypt.genSalt(10);
	console.log(salt);
	return bcrypt.hash(password, salt);
};

export const comparePassword = async (notHashed, hashedPassword) => {
	return await bcrypt.compare(notHashed, hashedPassword);
};
