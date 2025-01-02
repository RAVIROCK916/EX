import { Router } from "express";

import {
	getUsersBySearchController,
	getProfileController,
	getUserProfileController,
	saveProfileController,
	followUserController,
	unfollowUserController,
} from "../controllers/users";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.get("/", isAuthenticated, getUsersBySearchController);
router.get("/profile", isAuthenticated, getProfileController);
router.get("/:username/profile", isAuthenticated, getUserProfileController);
router.post("/profile/save", isAuthenticated, saveProfileController);
router.post("/follow/:userId", isAuthenticated, followUserController);
router.post("/unfollow/:userId", isAuthenticated, unfollowUserController);

export default router;
