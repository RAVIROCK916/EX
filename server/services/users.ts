import { followUser, searchUsers } from "../db/queryFn";

export const getUsersBySearch = async (search: string) => {
	const users = await searchUsers(search);
	return users;
};

export const followUserById = async (userId: string, followerId: string) => {
	const user = await followUser(userId, followerId);
	return user;
};
