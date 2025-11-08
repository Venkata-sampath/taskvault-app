const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

//@desc get all user's tasks
//@api GET /api/admin/task
//@access private
//@role admin
const getAllTasks = asyncHandler( async(req, res) => {
    const tasks = await Task.find()
    .populate("userId", "username email")
    .populate("assignedBy", "username email");
    res.json(tasks);
}); 

//@desc create task for user
//@api POST /api/admin/task
//@access private
//@role admin
const createAdminTask = asyncHandler( async(req, res) => {
    const {userId, title, description, status, priority, dueDate} = req.body;
    if(!userId || !title){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const task = await Task.create({
        userId, title, description, status, priority, dueDate, 
        assignedBy: req.user.id
    });

    res.status(201).json(task);
});

//@desc get user task with id 
//@api GET /api/admin/task/:id
//@access private
//@role admin
const getAdminTask = asyncHandler( async(req, res) => {
    const task = await Task.findById(req.params.id)
    .populate("userId", "username email")
    .populate("assignedBy", "username email");
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json(task);
});

//@desc update user task 
//@api PUT /api/admin/task/:id
//@access private
//@role admin
const updateAdminTask = asyncHandler( async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }

    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedTask);
});

//@desc delete user task 
//@api DELETE /api/admin/task/:id
//@access private
//@role admin
const deleteAdminTask = asyncHandler( async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }

    await task.deleteOne();
    res.status(200).json(`Task Deleted successfully`);
});

module.exports = {getAllTasks, createAdminTask, getAdminTask, updateAdminTask, deleteAdminTask};