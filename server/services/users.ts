import db from "../db";
import {
	getUserById,
	getUserByUsername,
	searchUsers,
	getFollowers,
	getFollowingUsers,
	followUser,
	unfollowUser,
	isFollowing,
	getUsers,
} from "../db/queryFn";

export const getUsersService = async () => {
	const users = await getUsers();
	return users;
};

export const getUsersBySearchService = async (search: string) => {
	const users = await searchUsers(search);
	return users;
};

export const getProfileService = async (userId: string) => {
	const user = await getUserById(userId);
	return user.rows[0];
};

export const getUserProfileService = async (username: string) => {
	const user = await getUserByUsername(username);
	return user.rows[0];
};

export const saveProfileService = async (id: string, data: any) => {
	// Generate the update query parameters
	const setStatements = Object.keys(data).map(
		(key, index) => `${key} = $${index + 1}`
	);
	const values = Object.values(data);
	values.push(id);

	const query = `
    UPDATE users 
    SET ${setStatements.join(", ")} 
    WHERE id = $${values.length}
  `;

	await db.query(query, values);
};

export const getFollowersService = async (userId: string) => {
	const followers = await getFollowers(userId);
	return followers.rows;
};

export const getFollowingUsersService = async (userId: string) => {
	const followingUsers = await getFollowingUsers(userId);
	return followingUsers.rows;
};

export const followUserService = async (userId: string, followerId: string) => {
	const user = await followUser(userId, followerId);
	return user;
};

export const unfollowUserService = async (
	userId: string,
	followerId: string
) => {
	const user = await unfollowUser(userId, followerId);
	return user;
};

export const isFollowingService = async (
	userId: string,
	followerId: string
) => {
	const query = await isFollowing(userId, followerId);
	return query;
};
