import { Router } from "express";

import {
	createPostController,
	getPostsController,
	getRecentPostsController,
	likePostController,
	unlikePostController,
	commentPostController,
	getPostCommentsController,
} from "../controllers/posts";

const router = Router();

router.get("/", getPostsController);
router.post("/", createPostController);
router.get("/latest", getRecentPostsController);
router.post("/:id/like", likePostController);
router.post("/:id/unlike", unlikePostController);
router.post("/:id/comment", commentPostController);
router.get("/:id/comments", getPostCommentsController);

export default router;
