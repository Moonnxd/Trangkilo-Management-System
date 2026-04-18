import express from "express";
<<<<<<< HEAD
const router = express.Router();

import { signup, login } from "../controllers/authController.js";
import { signupValidator } from "../validators/authValidator.js";
import rateLimit from "../middlewares/rateLimiter.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/signup", rateLimit, signupValidator, signup);
router.post("/login", rateLimit, login);


//temp for testing only
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "profile page",
    userId: req.session.userId
  });
});
=======
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/", signup);
>>>>>>> origin/pre-prod

export default router;