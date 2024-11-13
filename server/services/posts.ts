import {
	insertIntoPosts,
	getRecentPosts,
	getPostsByUser,
	insertIntoLikes,
	deleteFromLikes,
} from "../db/queryFn";

export const createPostService = async (
	userId: string,
	caption: string,
	image: string
) => {
	const post = await insertIntoPosts(userId, caption, image);
	return post;
};

export const getRecentPostsService = async () => {
	const posts = await getRecentPosts();
	return posts.rows;
};

export const getPostsService = async (userId: string) => {
	const posts = await getPostsByUser(userId);
	return posts.rows;
};

export const likePostService = async (postId: string, userId: string) => {
	await insertIntoLikes(postId, userId);
};

export const unlikePostService = async (postId: string, userId: string) => {
	await deleteFromLikes(postId, userId);
};
