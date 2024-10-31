import express, { Router } from "express";
import * as path from "path";

import upload from "../lib/multer";
import { uploadImageController } from "../controllers/images";

const router = Router();

router.post("/upload", upload.single("image"), uploadImageController);

export default router;
