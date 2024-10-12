import type { Request, Response } from "express";

import { getUsersByUsername } from "../db/queryFn";
import { createNewUser, generateTokens, getUser } from "../services/auth";

import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	// params validation

	if (!username || !password) {
		res.status(400).send({
			error: "Username and password are required!",
		});
		return;
	}

	// check if user exists
	const user = await getUser(username);

	if (!user) {
		res.status(400).send({
			error: "Invalid username or password!",
			code: "form_param_format_invalid",
		});
		return;
	}

	// check if password is correct

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		res.status(401).send({
			error: "Invalid username or password!",
			code: "form_password_pwned",
		});
		return;
	}

	// generate tokens

	const { accessToken, refreshToken } = generateTokens(user);

	// insert tokens in http-only cookie

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: true,
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
	});

	res.send({ message: "Logged in successfully" });
};

export const signup = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	// params validation
	if (!username || !email || !password) {
		res.status(400).send({
			message: "Username, email and password are required!",
		});
		return;
	}
	if (
		username.includes(" ") ||
		username.split("").some((char: string) => char === char.toUpperCase())
	) {
		res.status(400).send({
			message: "Username cannot contain spaces and uppercase letters!",
		});
		return;
	}
	// write email validation
	if (!email.includes("@") || !email.includes(".")) {
		res.status(400).send({ message: "Invalid email format!" });
		return;
	}

	const users = await getUsersByUsername(username);

	if (users.rows.length > 0) {
		res.status(400).send({ message: "User already exists" });
		return;
	}

	try {
		await createNewUser(username, email, password);
		res.send({ message: "User created" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Something went wrong" });
	}
};

export const logout = (req: Request, res: Response) => {
	// Clear the access token cookie
	res.cookie("accessToken", "", {
		httpOnly: true,
		secure: true,
		expires: new Date(0),
	});

	// Clear the refresh token cookie
	res.cookie("refreshToken", "", {
		httpOnly: true,
		secure: true,
		expires: new Date(0),
	});

	res.send({ message: "Logged out successfully" });
};
