import type { Request, NextFunction } from "express";
import type { customResponse } from "../types";

export const logger = (
	req: Request,
	res: customResponse,
	next: NextFunction
) => {
	const reqId = crypto.randomUUID();

	console.log(
		`[${reqId}] ${req.method} ${req.url} ${JSON.stringify(req.body)}`
	);

	next();
};
