import { insertIntoPosts, getRecentPosts } from "../db/queryFn";

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
