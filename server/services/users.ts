import db from "../db";
import {
	followUser,
	getUserById,
	searchUsers,
	unfollowUser,
	updateUser,
} from "../db/queryFn";

export const getUsersBySearchService = async (search: string) => {
	const users = await searchUsers(search);
	return users;
};

export const getProfileService = async (userId: string) => {
	const user = await getUserById(userId);
	return user;
};

export const saveProfileService = async (
	id: string,
	fullname: string,
	email: string,
	bio: string,
	gender: string,
	birth_date: string,
	location: string,
	personal_link: string
) => {
	const validUpdates = {
		name: fullname,
		email,
		bio,
		gender,
		birth_date,
		location,
		personal_link,
	};

	// Filter out undefined values
	const filteredUpdates = Object.fromEntries(
		Object.entries(validUpdates).filter(([_, value]) => value !== undefined)
	);

	if (Object.keys(filteredUpdates).length === 0) {
		return;
	}

	// Generate the update query parameters
	const setStatements = Object.keys(filteredUpdates).map(
		(key, index) => `${key} = $${index + 1}`
	);
	const values = Object.values(filteredUpdates);
	values.push(id);

	const query = `
    UPDATE users 
    SET ${setStatements.join(", ")} 
    WHERE id = $${values.length}
  `;

	await db.query(query, values);
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
