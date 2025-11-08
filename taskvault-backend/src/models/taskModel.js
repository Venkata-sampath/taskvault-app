const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    dueDate: {
        type: Date,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);