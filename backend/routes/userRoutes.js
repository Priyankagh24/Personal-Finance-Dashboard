const express = require("express");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Configure multer (store in /uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Upload profile photo
router.post("/upload-profile", protect, upload.single("profileImage"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileImageUrl = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ profileImageUrl: user.profileImageUrl });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
});

module.exports = router;
