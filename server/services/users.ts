import { followUser, searchUsers, unfollowUser } from "../db/queryFn";

export const getUsersBySearchService = async (search: string) => {
	const users = await searchUsers(search);
	return users;
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
