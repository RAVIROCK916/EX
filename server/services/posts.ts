import {
	insertIntoPosts,
	getPosts,
	getRecentPosts,
	getPostsByUser,
	insertIntoLikes,
	deleteFromLikes,
	getLikesOfUser,
	insertIntoComments,
	getCommentsOfPost,
	insertIntoBookmarks,
	deleteFromBookmarks,
	getBookmarksOfUser,
} from "../db/queryFn";

export const getPostService = async (id: string) => {
	const post = await getPosts([id]);
	return post.rows[0];
};

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

export const getUserPostsService = async (userId: string) => {
	const posts = await getPostsByUser(userId);
	return posts.rows;
};

export const getLikedPostsService = async (userId: string) => {
	const likes = await getLikesOfUser(userId);
	const likedPosts = likes.rows.map((like) => like.post_id);
	const posts = await getPosts(likedPosts);
	return posts.rows;
};

export const getBookmarkedPostsService = async (userId: string) => {
	const bookmarks = await getBookmarksOfUser(userId);
	const bookmarkedPosts = bookmarks.rows.map((bookmark) => bookmark.post_id);
	const posts = await getPosts(bookmarkedPosts);
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

export const bookmarkPostService = async (postId: string, userId: string) => {
	insertIntoBookmarks(postId, userId);
};

export const unbookmarkPostService = async (postId: string, userId: string) => {
	deleteFromBookmarks(postId, userId);
};

export const getBookmarksService = async (userId: string) => {
	const bookmarks = await getBookmarksOfUser(userId);
	return bookmarks.rows;
};
