import { Router } from "express";
import { auth, login, logout, refreshToken, signup } from "../controllers/auth";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.post("/refresh", refreshToken);

router.get("/me", isAuthenticated, auth);

router.use((req, res, next) => {
	console.log("Router-level middleware executed");
	next();
});

export default router;
