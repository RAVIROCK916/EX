import { followUser, searchUsers, unfollowUser } from "../db/queryFn";

export const getUsersBySearch = async (search: string) => {
	const users = await searchUsers(search);
	return users;
};

export const followUserById = async (userId: string, followerId: string) => {
	const user = await followUser(userId, followerId);
	return user;
};

export const unfollowUserById = async (userId: string, followerId: string) => {
	const user = await unfollowUser(userId, followerId);
	return user;
};
