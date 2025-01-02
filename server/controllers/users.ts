import { Request, Response } from "express";

import {
	getUsersService,
	getUsersBySearchService,
	followUserService,
	unfollowUserService,
	getProfileService,
	saveProfileService,
	getUserProfileService,
	isFollowingService,
} from "../services/users";

import updateUsersInfo from "../utils/updateUsersInfo";

export const getUsersBySearchController = async (
	req: Request,
	res: Response
) => {
	let users;

	const { search } = req.query;

	if (!search) {
		users = await getUsersService();
	} else {
		users = await getUsersBySearchService(String(search));
	}

	users = await updateUsersInfo(users.rows, req.user);

	return res.json(users);
};

export const getProfileController = async (req: Request, res: Response) => {
	const userId = req.user;
	const user = await getProfileService(userId);
	res.json(user.rows[0]);
};

export const getUserProfileController = async (req: Request, res: Response) => {
	const { username } = req.params;
	let user = await getUserProfileService(username);

	// Check if the user is following the current user
	user = await updateUsersInfo([user], req.user);

	res.json(user);
};

export const saveProfileController = async (req: Request, res: Response) => {
	// Filter out undefined values
	const validUpdates = Object.fromEntries(
		Object.entries(req.body).filter(([_, value]) => value !== undefined)
	);

	if (Object.keys(validUpdates).length === 0) {
		return;
	}

	try {
		await saveProfileService(req.user, validUpdates);
		return res.status(200).send({ message: "Profile saved successfully" });
	} catch (err) {
		return res.status(500).send({ error: "Failed to save profile" });
	}
};

export const followUserController = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const followerId = req.user;

	if (!userId || !followerId) {
		return res.status(401).send({ error: "Unauthorized" });
	}

	try {
		followUserService(userId, followerId);

		res.send({ message: "User followed successfully" });
	} catch (err) {
		res.status(500).send({ error: "Failed to follow user" });
	}
};

export const unfollowUserController = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const followerId = req.user;

	if (!userId || !followerId) {
		return res.status(401).send({ error: "Unauthorized" });
	}

	try {
		unfollowUserService(userId, followerId);

		res.send({ message: "User unfollowed successfully" });
	} catch (err) {
		res.status(500).send({ error: "Failed to unfollow user" });
	}
};
