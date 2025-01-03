import bcrypt from "bcrypt";
import {
	getUserById,
	getUserByUsername,
	getUserByEmail,
	insertIntoUsers,
} from "../db/queryFn";

export const createNewUser = async (
	name: string,
	username: string,
	email: string,
	password: string
) => {
	const hashPassword = await bcrypt.hash(password, 10);
	await insertIntoUsers(name, username, email, hashPassword);
};

export const getUserByUsernameService = async (username: string) => {
	const users = await getUserByUsername(username);
	const user = users.rows[0];

	if (!user) {
		return null;
	}

	return user;
};

export const getUserByEmailService = async (email: string) => {
	const users = await getUserByEmail(email);
	const user = users.rows[0];
	if (!user) {
		return null;
	}
	return user;
};

export const authService = async (id: string) => {
	const userResults = await getUserById(id);
	const user = userResults.rows[0];
	console.log({ user });

	if (!user) {
		return null;
	}

	return user;
};
