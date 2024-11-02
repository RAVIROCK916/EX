import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default async function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const accessToken = req.headers.authorization?.split(" ")[1];

	if (!accessToken) {
		return res
			.status(403)
			.send({ message: "Unauthorized! Access token required!!!" });
	}

	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET!,
		(err, decoded: any) => {
			if (err) {
				console.log(err.message);
				return res.status(403).send({ message: "Invalid token" });
			}

			req.user = decoded.userId;

			next();
		}
	);
}
