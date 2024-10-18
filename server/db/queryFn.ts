import db from "../db";

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

export const getUsersByUsername = (username: string) => {
	const users = db.query("SELECT * FROM users WHERE username = $1", [username]);
	return users;
};

export const searchUsers = (search: string) => {
	const users = db.query("SELECT * FROM users WHERE username LIKE $1", [
		`%${search}%`,
	]);
	return users;
};

export const followUser = (userId: string, followerId: string) => {
	const user = db.query(
		"INSERT INTO follows (user_id, follower_id) VALUES ($1, $2)",
		[userId, followerId]
	);
	return user;
};
