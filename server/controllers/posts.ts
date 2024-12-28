import { Request, Response } from "express";
import {
	createPostService,
	getUserPostsService,
	getRecentPostsService,
	getLikedPostsService,
	likePostService,
	unlikePostService,
	commentPostService,
	getPostCommentsService,
	bookmarkPostService,
} from "../services/posts";
import updatePostInfo from "../utils/updatePostInfo";

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
		posts = await updatePostInfo(posts, req.user);

		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch recent posts" });
	}
};

export const getUserPostsController = async (req: Request, res: Response) => {
	const userId = req.params.id;

	try {
		const posts = await getUserPostsService(userId);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch posts by user" });
	}
};

export const getLikedPostsController = async (req: Request, res: Response) => {
	const userId = req.params.id;
	try {
		const posts = await getLikedPostsService(userId);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch liked posts" });
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

	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({ error: "Body is required" });
	}

	const { comment, reply_to } = req.body;

	try {
		await commentPostService(postId, userId, comment, reply_to);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Failed to comment post" });
	}

	res.status(200).json({ message: "Comment posted successfully" });
};

export const getPostCommentsController = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	try {
		const comments = await getPostCommentsService(id);
		res.status(200).json(comments);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch comments" });
	}
};

export const bookmarkPostController = async (req: Request, res: Response) => {
	const postId = req.params.id;
	const userId = req.user;

	try {
		await bookmarkPostService(postId, userId);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Failed to bookmark post" });
	}

	res.status(200).json({ message: "Post bookmarked successfully" });
};
