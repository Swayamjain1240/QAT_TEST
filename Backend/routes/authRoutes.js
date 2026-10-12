import express from "express"

const router = express.Router();
import {register, login} from "../controllers/authController.js" 

import {protect, authorize} from "../middleware/authMiddleware.js"


router.post("/register", register);


router.post("/login", login);


router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

router.get("/user", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to User Dashboard"
  });
});

router.get("/manager",protect,authorize("manager", "admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Manager Dashboard"
    });
  }
);

router.get("/admin",protect,authorize("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Admin Dashboard"
    });
  }
);

export default router
