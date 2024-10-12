import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUsersByUsername, insertIntoUsers } from "../db/queryFn";
import type User from "../types/user";

export const createNewUser = async (
	username: string,
	email: string,
	password: string
) => {
	const hashPassword = await bcrypt.hash(password, 10);
	await insertIntoUsers(username, email, hashPassword);
};

export const getUser = async (username: string) => {
	const users = await getUsersByUsername(username);
	const user = users.rows[0];

	if (!user) {
		return null;
	}

	return user;
};

export const generateTokens = (user: User) => {
	const accessToken = jwt.sign(
		{ userId: user.id },
		process.env.ACCESS_TOKEN_SECRET!,
		{
			expiresIn: "15min",
		}
	);

	const refreshToken = jwt.sign(
		{ userId: user.id },
		process.env.REFRESH_TOKEN_SECRET!,
		{
			expiresIn: "1d",
		}
	);

	return { accessToken, refreshToken };
};
