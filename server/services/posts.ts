import {
	insertIntoPosts,
	getRecentPosts,
	getPostsByUser,
	insertIntoLikes,
	deleteFromLikes,
	getLikesOfUser,
	insertIntoComments,
	getCommentsOfPost,
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
	insertIntoLikes(postId, userId);
};

export const unlikePostService = async (postId: string, userId: string) => {
	deleteFromLikes(postId, userId);
};

export const getLikesService = async (userId: string) => {
	const likes = await getLikesOfUser(userId);
	return likes.rows;
};

export const commentPostService = async (
	postId: string,
	userId: string,
	body: string,
	reply_to: string
) => {
	insertIntoComments(postId, userId, body, reply_to);
};

export const getPostCommentsService = async (postId: string) => {
	const comments = await getCommentsOfPost(postId);
	return comments.rows;
};
