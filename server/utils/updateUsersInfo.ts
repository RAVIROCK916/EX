import { getFollowingUsersService } from "../services/users";
import User from "../types/user";

export default async function updateUsersInfo(users: User[], userId: string) {
	if (!userId) return users;

	// add is_following property to each user
	const followingUsers = await getFollowingUsersService(userId);

	users = users.map((user) => {
		user.is_following = followingUsers.some(
			(follow) => follow.user_id === user.id
		);
		return user;
	});

	return users;
}
