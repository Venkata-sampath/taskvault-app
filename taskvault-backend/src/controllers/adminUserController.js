const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc get all users 
//@api GET /api/admin/users
//@access private
//@role admin
const getAllUsers = asyncHandler( async(req, res) => {
    const users = await User.find();
    res.json(users);
});

//@desc get user 
//@api GET /api/admin/users/:id
//@access private
//@role admin
const getUser = asyncHandler( async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    res.json(user);
});

//@desc delete user 
//@api DELETE /api/admin/users/:id
//@access private
//@role admin
const deleteUser = asyncHandler( async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    await user.deleteOne();
    res.json({message: `User Deleted Successfully`});
});

module.exports = {getAllUsers, getUser, deleteUser};