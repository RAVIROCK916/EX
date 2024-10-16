import { Request, Response } from "express";
import { getUsersBySearch } from "../services/users";

export const fetchUsers = async (req: Request, res: Response) => {
	const { search } = req.query;
	console.log("search", search);

	const users = await getUsersBySearch(String(search));
	res.json(users.rows);
};

export const followUser = async (req: Request, res: Response) => {
	// const { following_user } = req.body;
	// const { id: followerId } = req.user;
	// const user = await followUserById(userId, followerId);

	console.log(req.user);

	res.send({ message: "User followed successfully" });
};
