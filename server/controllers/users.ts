import { Request, Response } from "express";

import {
	getUsersBySearchService,
	followUserService,
	unfollowUserService,
} from "../services/users";

export const getUsersBySearchController = async (
	req: Request,
	res: Response
) => {
	const { search } = req.query;
	console.log("search", search);

	const users = await getUsersBySearchService(String(search));
	res.json(users.rows);
};

export const followUserController = async (req: Request, res: Response) => {
	const { userId } = req.body;
	const followerId = req.user;

	if (!userId || !followerId) {
		return res.status(401).send({ error: "Unauthorized" });
	}

	try {
		followUserService(userId, followerId);

		res.send({ message: "User followed successfully" });
	} catch (err) {
		res.status(500).send({ error: "Failed to follow user" });
	}
};

export const unfollowUserController = async (req: Request, res: Response) => {
	const { userId } = req.body;
	const followerId = req.user;

	if (!userId || !followerId) {
		return res.status(401).send({ error: "Unauthorized" });
	}

	try {
		unfollowUserService(userId, followerId);

		res.send({ message: "User unfollowed successfully" });
	} catch (err) {
		res.status(500).send({ error: "Failed to unfollow user" });
	}
};
