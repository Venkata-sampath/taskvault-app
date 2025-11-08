const express = require("express");
const { getAllTasks, createAdminTask, getAdminTask, updateAdminTask, deleteAdminTask } = require("../controllers/adminTaskController");
const validateToken = require("../middleware/validateTokenHandler");
const authorizeRoles = require("../middleware/authHandler");
const { getAllUsers, getUser, deleteUser } = require("../controllers/adminUserController");
const router = express.Router();

// validation and authorization middleware
router.use(validateToken, authorizeRoles("admin"));

// Task Routes
router.route("/task").get(getAllTasks).post(createAdminTask);
router.route("/task/:id").get(getAdminTask).put(updateAdminTask).delete(deleteAdminTask);

// User Routes
router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUser).delete(deleteUser);

module.exports = router;