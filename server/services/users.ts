import { searchUsers } from "../db/queryFn";

export const getUsersBySearch = async (search: string) => {
	const users = await searchUsers(search);
	return users;
};
