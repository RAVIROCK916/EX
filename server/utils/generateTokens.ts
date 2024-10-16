import jwt from "jsonwebtoken";
import User from "../types/user";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constants";

export const generateTokens = (user: User) => {
	const accessToken = jwt.sign(
		{ userId: user.id },
		process.env.ACCESS_TOKEN_SECRET!,
		{ expiresIn: ACCESS_TOKEN_EXPIRY }
	);

	const refreshToken = jwt.sign(
		{ userId: user.id },
		process.env.REFRESH_TOKEN_SECRET!,
		{ expiresIn: REFRESH_TOKEN_EXPIRY }
	);

	return { accessToken, refreshToken };
};
