const UserDetails = require('../Models/UserSignSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//Post UserSign Details
exports.signdetail = async (req, res) => {
    try {
        const { name, email, password, confirmpassword, } = req.body;
        if (!name || !email || !password || !confirmpassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (name.length < 4) {
            return res.status(400).json({ message: "Username should have at least 4 characters" });
        }
        if (password.length < 4) {
            return res.status(400).json({ message: "password should have at least 4 Digit" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }
        const existingUser = await UserDetails.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists with this email" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new UserDetails({
            name,
            email,
            password: hashpassword,
        });
        const savedsign = await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// User Login
exports.userlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserDetails.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign(
            { userId: existingUser._id, name: existingUser.name, email: existingUser.email, },
            "your_very_secret_key",
            { expiresIn: "1h" }
        );
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

//user update
exports.userUpdate = async (req, res)=>{
    const { name, email } = req.body;
    try{
        const updateUser = await UserDetails.findByIdAndUpdate(
            req.params.id,
            {name, email},
            {new: true}
        )
        res.json(updateUser);
    }catch(error){
        res.status(500).json({ message: 'Error updating user' });
    }
}

