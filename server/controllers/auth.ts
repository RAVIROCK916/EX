import type { Request, Response } from "express";
import db from "../db";

export const login = async (req: Request, res: Response) => {
	res.send("Login");
};

export const signup = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;
	console.log(username, email, password);

	db.query(
		"INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
		[username, email, password]
	);

	res.send("Signup");
};
