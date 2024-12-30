import db from "../db";

// User queries

export const insertIntoUsers = async (
	username: string,
	email: string,
	password: string
) => {
	await db.query(
		"INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
		[username, email, password]
	);
};

export const updateUser = (
	id: string,
	name: string,
	email: string,
	bio: string,
	gender: string,
	birthDate: string,
	personalLink: string
) => {
	db.query(
		"UPDATE users SET name = $1, email = $2, bio = $3, gender = $4, birth_date = $5, personal_link = $6 WHERE id = $7",
		[name, email, bio, gender, birthDate, personalLink, id]
	);
};

export const getUserById = (id: string) => {
	const user = db.query("SELECT * FROM user_view WHERE id = $1", [id]);
	return user;
};

export const getUserByUsername = (username: string) => {
	const user = db.query("SELECT * FROM users WHERE username = $1", [username]);
	return user;
};

export const searchUsers = (search: string) => {
	const users = db.query("SELECT * FROM user_view WHERE username LIKE $1", [
		`%${search}%`,
	]);
	return users;
};

export const getFollowers = (userId: string) => {
	const followers = db.query("SELECT * FROM followers WHERE user_id = $1", [
		userId,
	]);
	return followers;
};

export const followUser = async (userId: string, followerId: string) => {
	const user = await db.query(
		"INSERT INTO followers (user_id, follower_id) VALUES ($1, $2)",
		[userId, followerId]
	);
	await db.query(
		"UPDATE users SET followers_count = followers_count + 1 WHERE id = $1",
		[userId]
	);
	await db.query(
		"UPDATE users SET following_count = following_count + 1 WHERE id = $1",
		[followerId]
	);
	return user;
};

export const unfollowUser = async (userId: string, followerId: string) => {
	const user = await db.query(
		"DELETE FROM followers WHERE user_id = $1 AND follower_id = $2",
		[userId, followerId]
	);
	await db.query(
		"UPDATE users SET followers_count = followers_count - 1 WHERE id = $1",
		[userId]
	);
	await db.query(
		"UPDATE users SET following_count = following_count - 1 WHERE id = $1",
		[followerId]
	);
	return user;
};

export const isFollowing = (userId: string, followerId: string) => {
	const result = db.query(
		"SELECT * FROM followers WHERE user_id = $1 AND follower_id = $2",
		[userId, followerId]
	);
	return result;
};

// Post queries

export const insertIntoPosts = (
	userId: string,
	caption: string,
	image: string
) => {
	const post = db.query(
		"INSERT INTO posts (user_id, caption, image_url) VALUES ($1, $2, $3)",
		[userId, caption, image]
	);
	return post;
};

export const getPosts = (postIds: string[]) => {
	const posts = db.query("SELECT * FROM user_posts WHERE id = ANY($1)", [
		postIds,
	]);
	return posts;
};

export const getRecentPosts = () => {
	const posts = db.query(
		"SELECT * FROM user_posts ORDER BY created_at DESC LIMIT 10"
	);
	return posts;
};

export const getPostsByUser = (id: string) => {
	const posts = db.query("SELECT * FROM user_posts WHERE user_id = $1", [id]);
	return posts;
};

// Likes queries

export const insertIntoLikes = (postId: string, userId: string) => {
	db.query("INSERT INTO likes (post_id, user_id) VALUES ($1, $2)", [
		postId,
		userId,
	]);
	db.query("UPDATE posts SET no_of_likes = no_of_likes + 1 WHERE id = $1", [
		postId,
	]);
};

export const deleteFromLikes = (postId: string, userId: string) => {
	db.query("DELETE FROM likes WHERE post_id = $1 AND user_id = $2", [
		postId,
		userId,
	]);
	db.query("UPDATE posts SET no_of_likes = no_of_likes - 1 WHERE id = $1", [
		postId,
	]);
};

export const getLikesOfUser = (userId: string) => {
	const likes = db.query("SELECT * FROM likes WHERE user_id = $1", [userId]);
	return likes;
};

// Comments queries

export const insertIntoComments = (
	postId: string,
	userId: string,
	body: string,
	reply_to: string
) => {
	db.query(
		"INSERT INTO comments (post_id, user_id, body, reply_to) VALUES ($1, $2, $3, $4)",
		[postId, userId, body, reply_to]
	);
};

export const getCommentsOfPost = (postId: string) => {
	return db.query(
		"SELECT comments.*, users.username, users.profile_picture_url FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id = $1",
		[postId]
	);
};

// Bookmarks queries

export const insertIntoBookmarks = (postId: string, userId: string) => {
	db.query("INSERT INTO bookmarks (post_id, user_id) VALUES ($1, $2)", [
		postId,
		userId,
	]);
};

export const deleteFromBookmarks = (postId: string, userId: string) => {
	db.query("DELETE FROM bookmarks WHERE post_id = $1 AND user_id = $2", [
		postId,
		userId,
	]);
};

export const getBookmarksOfUser = (userId: string) => {
	return db.query("SELECT * FROM bookmarks WHERE user_id = $1", [userId]);
};
