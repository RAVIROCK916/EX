import bcrypt from "bcrypt";
import {
	getUserById,
	getUsersByUsername,
	insertIntoUsers,
} from "../db/queryFn";

export const createNewUser = async (
	username: string,
	email: string,
	password: string
) => {
	const hashPassword = await bcrypt.hash(password, 10);
	await insertIntoUsers(username, email, hashPassword);
};

export const getUserByUsername = async (username: string) => {
	const users = await getUsersByUsername(username);
	const user = users.rows[0];

	if (!user) {
		return null;
	}

	return user;
};

export const authService = async (id: string) => {
	const user = await getUserById(id);

	if (!user) {
		return null;
	}

	return user;
};
