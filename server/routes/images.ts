import { Router } from "express";

import upload from "../lib/multer";
import {
	imagekitAuthController,
	uploadImageController,
} from "../controllers/images";

const router = Router();

router.get("/auth", imagekitAuthController);
router.post("/upload", upload.single("image"), uploadImageController);

export default router;
