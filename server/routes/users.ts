import { Router } from "express";

import {
	getUsersBySearchController,
	followUserController,
} from "../controllers/users";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.get("/", getUsersBySearchController);
router.post("/follow", isAuthenticated, followUserController);

export default router;
