import { Router } from "express";

import {
	createPostController,
	getPostsController,
	getRecentPostsController,
	likePostController,
	unlikePostController,
	commentPostController,
} from "../controllers/posts";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.get("/", getPostsController);
router.post("/", createPostController);
router.get("/latest", getRecentPostsController);
router.post("/:id/like", likePostController);
router.post("/:id/unlike", unlikePostController);
router.post("/:id/comment", commentPostController);

export default router;
