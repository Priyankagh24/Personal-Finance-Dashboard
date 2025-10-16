 const User = require('../models/User')
 
 const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Generate JWT token
const generateToken = (id) => {
return jwt.sign( {id} , process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
exports.registerUser = async (req,res)=>{
    const {fullName , email, password, profileImageUrl="" } =req.body ||{};

    // Validation: Check for missing fields
if (!fullName || !email || !password)
return res.status(400).json({ message: "All fields are required" });



try{
// Check if email already exists
const existingUser = await User.findOne({ email });
if (existingUser) {
return res. status(400).json({ message: "Email already in use" });
};

// Create the user
const user = await User.create({
fullName,
email,
password,
profileImageUrl:profileImageUrl || ""
});

res.status(201).json({
id: user._id,
 user: {
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
token: generateToken(user._id),
});
} catch (err){
res
.status(500)
.json({ message: "Error registering user", error: err.message});
}
};

// login user
exports.loginUser = async (req,res)=>{
    const { email, password } = req. body || {};
if (!email || !password) {
return res.status(400).json({ message: "All fields are required"});
}
try{
const user = await User.findOne({ email });
if(!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" });
}
res. status (200).json({
id: user._id,
 user: {
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl || "",
      _id: user._id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
token: generateToken(user._id),
});
}
catch (err){
    res.status (500)
.json({ message: "Error registering user" ,error:err.message});
}
};
// get user info 
// Get user info
exports.getUserInfo = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }
 res.status(200).json({
    id: req.user._id,
    user: {
      fullName: req.user.fullName,
      email: req.user.email,
      profileImageUrl: req.user.profileImageUrl || "", // <-- this should fallback to empty string
      _id: req.user._id,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    },
    token: req.headers.authorization.split(" ")[1],
  });
};

