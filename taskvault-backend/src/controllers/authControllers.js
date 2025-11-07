const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register user
//@api POST /api/auth/register
//@access public 
const register = asyncHandler(async(req,res) => {

    const {username, email, password, role}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }
    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username, email, password: hashedPassword, role
    });

    await user.save();

    if(user){
        res.json({_id: user.id, username: user.username, email: user.email, role: user.role});
    }else{
        res.status(400);
        throw new Error("User details are invalid");
    }
});

//@desc login user
//@api POST /api/auth/login
//@access public 
const login = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});
    // comparing password with hashed password 
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            user: {
                username : user.username,
                email: user.email,
                role: user.role,
                id: user.id
            },
        }, process.env.JWT_SECRET,
        {expiresIn: "1hr"}
    )
    res.status(200).json({token});
    }else{
        res.status(401);
        throw new Error("Email id or password is invalid");
    }
});

//@desc Get current user details
//@api GET /api/auth/current
//@access private 
const currentUserInfo = asyncHandler( async(req, res) => {
    res.json(req.user);
});

module.exports = {register, login, currentUserInfo}