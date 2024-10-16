import { Router } from "express";
import { login, logout, refreshToken, signup } from "../controllers/auth";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.post("/refresh", refreshToken);

router.use((req, res, next) => {
	console.log("Router-level middleware executed");
	next();
});

export default router;
