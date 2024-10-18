import { Request, Response } from "express";
import { followUserById, getUsersBySearch } from "../services/users";

export const fetchUsers = async (req: Request, res: Response) => {
	const { search } = req.query;
	console.log("search", search);

	const users = await getUsersBySearch(String(search));
	res.json(users.rows);
};

export const followUser = async (req: Request, res: Response) => {
	const { userId } = req.body;
	const followerId = req.user;

	if (!userId || !followerId) {
		return res.status(401).send({ error: "Unauthorized" });
	}

	try {
		followUserById(userId, followerId);

		res.send({ message: "User followed successfully" });
	} catch {}
};
