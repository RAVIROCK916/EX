import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRY } from "../constants";

export const generateAccessToken = (id: string) => {
	const accessToken = jwt.sign(
		{ userId: id },
		process.env.ACCESS_TOKEN_SECRET!,
		{
			expiresIn: ACCESS_TOKEN_EXPIRY,
		}
	);
	return accessToken;
};
