import { Router } from "express";

import {
	createPostController,
	getPostsController,
	getRecentPostsController,
	likePostController,
	unlikePostController,
} from "../controllers/posts";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.post("/", createPostController);
router.get("/", getPostsController);
router.get("/latest", getRecentPostsController);
router.post("/like/:id", likePostController);
router.post("/unlike/:id", unlikePostController);

export default router;
