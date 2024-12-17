import { Request, Response } from "express";
import {
	createPostService,
	getLikesService,
	getPostsService,
	getRecentPostsService,
	likePostService,
	unlikePostService,
	commentPostService,
} from "../services/posts";

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
		let posts = await getRecentPostsService();
		if (req.user) {
			const likes = await getLikesService(req.user);
			console.log(likes);
			posts = posts.map((post) => {
				post.liked_by_user = likes.some((like) => {
					console.log(like.post_id, post.id, like.user_id, req.user);
					return like.post_id === post.id && like.user_id === req.user;
				});
				return post;
			});
		}
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch recent posts" });
	}
};

export const getPostsController = async (req: Request, res: Response) => {
	const userId = req.user;

	try {
		const posts = await getPostsService(userId);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch posts by user" });
	}
};

export const likePostController = async (req: Request, res: Response) => {
	const postId = req.params.id;
	const userId = req.user;

	try {
		await likePostService(postId, userId);
		res.status(200).json({ message: "Post liked successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to like post" });
	}
};

export const unlikePostController = async (req: Request, res: Response) => {
	const postId = req.params.id;
	const userId = req.user;

	try {
		await unlikePostService(postId, userId);
		res.status(200).json({ message: "Post unliked successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to unlike post" });
	}
};

export const commentPostController = async (req: Request, res: Response) => {
	const postId = req.params.id;
	const userId = req.user;
	const { body } = req;

	if (Object.keys(body).length === 0) {
		return res.status(400).json({ error: "Body is required" });
	}

	try {
		await commentPostService(postId, userId, body);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Failed to comment post" });
	}

	res.status(200).json({ message: "Comment posted successfully" });
};
