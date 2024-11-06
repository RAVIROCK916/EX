import { Router } from "express";

import {
	getUsersBySearchController,
	followUserController,
	getProfileController,
	saveProfileController,
} from "../controllers/users";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.get("/", getUsersBySearchController);
router.get("/profile", isAuthenticated, getProfileController);
router.post("/profile/save", isAuthenticated, saveProfileController);
router.post("/follow", isAuthenticated, followUserController);

export default router;
