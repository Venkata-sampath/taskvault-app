const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

//@desc Get all tasks
//@api GET /api/user/task
//@access private
const getUserTasks = asyncHandler(async(req, res) => {
    const tasks = await Task.find({userId: req.user.id})
    .populate("userId", "username email")
    .populate("assignedBy", "username email");
    res.status(200).json(tasks);
}); 

//@desc create a task
//@api POST /api/user/task
//@access private
const createUserTask = asyncHandler(async(req, res) => {
    const {title, description, status, priority, dueDate} = req.body;
    if(!title){
        res.status(400);
        throw new Error("title is required");
    }

    const task = await Task.create({
        title, description, status, priority, dueDate, 
        userId: req.user.id, assignedBy: req.user.id
    });

    res.status(201).json(task);
}); 

//@desc get a task with :id
//@api GET /api/user/task/:id
//@access private
const getUserTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }
    if(task.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to access other user tasks");
    }

    const populatedtask = await Task.findById(req.params.id)
    .populate("userId", "username email")
    .populate("assignedBy", "username email");

    res.status(200).json(populatedtask);
}); 

//@desc update task
//@api PUT /api/user/task/:id
//@access private
const updateUserTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }

    if(task.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to update other user tasks");
    }
    if(task.assignedBy.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to update tasks assignedBy admin");
    }

    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedTask);
}); 

//@desc delete task
//@api DELETE /api/user/task/:id
//@access private
const deleteUserTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }

    if(task.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to delete other user tasks");
    }
    if(task.assignedBy.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to delete tasks assignedBy admin");
    }
    
    await task.deleteOne()
    res.status(200).json(`Task Deleted successfully`);
}); 

module.exports = {getUserTasks, createUserTask, getUserTask, updateUserTask, deleteUserTask};