// write middleware to handle errors

import { type Request, type Response, type NextFunction } from "express";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err);
	res.status(500).send({
		message: "Something went wrong",
	});
	next();
};
