import { Router } from "express";
import { fetchUsers, followUser } from "../controllers/users";
import isAuthenticated from "../middleware/authentication";

const router = Router();

router.get("/", fetchUsers);
router.post("/follow", isAuthenticated, followUser);

export default router;
