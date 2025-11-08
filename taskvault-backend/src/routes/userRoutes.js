const express = require("express");
const router = express.Router();
const {getUserTasks, createUserTask, getUserTask, updateUserTask, deleteUserTask} = require("../controllers/userTaskController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
// Task Routes
router.route("/task").get(getUserTasks).post(createUserTask);
router.route("/task/:id").get(getUserTask).put(updateUserTask).delete(deleteUserTask);

module.exports = router;