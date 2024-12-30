import { Router } from "express";

import {
	createPostController,
	getRecentPostsController,
	getUserPostsController,
	getLikedPostsController,
	getBookmarkedPostsController,
	likePostController,
	unlikePostController,
	commentPostController,
	getPostCommentsController,
	bookmarkPostController,
} from "../controllers/posts";

const router = Router();

// router.get("/", getPostsController);
router.post("/", createPostController);
router.get("/latest", getRecentPostsController);
router.get("/user/:id", getUserPostsController);
router.get("/user/:id/liked", getLikedPostsController);
router.get("/user/:id/bookmarked", getBookmarkedPostsController);
router.post("/:id/like", likePostController);
router.post("/:id/unlike", unlikePostController);
router.post("/:id/comment", commentPostController);
router.get("/:id/comments", getPostCommentsController);
router.post("/:id/bookmark", bookmarkPostController);

export default router;
