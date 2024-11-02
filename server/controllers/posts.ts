import { Request, Response } from "express";
import { createPostService, getRecentPostsService } from "../services/posts";

export const createPostController = async (req: Request, res: Response) => {
	const { caption, image } = req.body;
	const userId = req.user;

	if (!caption) {
		return res.status(400).json({ error: "Caption is required" });
	}

	try {
		await createPostService(userId, caption, image);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Failed to create post" });
	}

	res.status(201).json({ message: "Post created successfully" });
};

export const getRecentPostsController = async (req: Request, res: Response) => {
	try {
		const posts = await getRecentPostsService();
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch recent posts" });
	}
};
