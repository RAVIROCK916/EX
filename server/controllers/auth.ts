import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

import {
	authService,
	createNewUser,
	getUserByEmailService,
	getUserByUsernameService,
} from "../services/auth";

import bcrypt from "bcrypt";
import { generateTokens } from "../utils/generateTokens";
import { generateAccessToken } from "../utils/generateAccessToken";

const ENVIRONMENT = process.env.NODE_ENV;

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// params validation
	if (!email || !password) {
		res.status(400).send({
			error: "Email and password are required!",
		});
		return;
	}

	// check if user exists
	const user = await getUserByEmailService(email);

	if (!user) {
		res.status(400).send({
			error: "Invalid email or password!",
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
	if (ENVIRONMENT === "development") {
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		});
	} else if (ENVIRONMENT === "production") {
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
	}
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: false,
	});

	res.send({ message: "Logged in successfully", token: accessToken });
};

export const signup = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	// params validation
	if (!name || !email || !password) {
		res.status(400).send({
			error: "Name, email and password are required!",
			code: "form_param_format_invalid",
		});
		return;
	}

	// write email validation
	if (!email.includes("@") || !email.includes(".")) {
		return res.status(400).send({
			error: "Invalid email format!",
			code: "form_email_format_invalid",
		});
	}

	const user = await getUserByEmailService(email);

	if (user) {
		return res
			.status(400)
			.send({ error: "User already exists", code: "form_email_duplicate" });
	}

	// create unique username
	let username = "";

	const uniqueUsername = name.slice(0, 8).toLowerCase().replace(/ /g, "");

	while (1) {
		const randomNumber = Math.floor(Math.random() * 10000);
		username = `${uniqueUsername}${randomNumber}`;

		const user = await getUserByUsernameService(username);
		if (user === null) {
			break;
		}
	}

	try {
		await createNewUser(name, username, email, password);

		const user = await getUserByUsernameService(username);

		// generate tokens
		const { accessToken, refreshToken } = generateTokens(user);

		// insert tokens in http-only cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
		});

		res.send({ message: "User created", token: accessToken });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Something went wrong" });
	}
};

export const auth = async (req: Request, res: Response) => {
	const userId = req.user;

	const user = await authService(userId);
	if (!user) {
		return res.status(401).send({ message: "Unauthorized" });
	}

	res.status(200).send({
		message: "Authenticated",
		id: userId,
		name: user.name,
		username: user.username,
		profile_picture_url: user.profile_picture_url,
	});
};

export const refreshToken = (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		return res
			.status(401)
			.send({ message: "Unauthorized! Refresh token required!!!" });
	}

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET!,
		(err: any, decoded: any) => {
			if (err) {
				return res
					.status(401)
					.send({ error: "User unauthorized! Invalid Refresh token!!!" });
			}

			const accessToken = generateAccessToken(decoded.userId);
			return res.status(200).json({ accessToken });
		}
	);
};

export const logout = (req: Request, res: Response) => {
	// Clear the refresh token cookie
	res.cookie("refreshToken", "", {
		httpOnly: true,
		secure: true,
		expires: new Date(0),
	});

	res.send({ message: "Logged out successfully" });
};
