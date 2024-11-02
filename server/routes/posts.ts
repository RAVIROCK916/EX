import { Router } from "express";

import {
	createPostController,
	getRecentPostsController,
} from "../controllers/posts";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.post("/", isAuthenticated, createPostController);
router.get("/latest", isAuthenticated, getRecentPostsController);

export default router;
