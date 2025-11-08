const express = require("express");
const { getAllTasks, createAdminTask, getAdminTask, updateAdminTask, deleteAdminTask } = require("../controllers/adminTaskController");
const validateToken = require("../middleware/validateTokenHandler");
const authorizeRoles = require("../middleware/authHandler");
const router = express.Router();

router.use(validateToken, authorizeRoles("admin"));
router.route("/").get(getAllTasks).post(createAdminTask);
router.route("/:id").get(getAdminTask).put(updateAdminTask).delete(deleteAdminTask);

module.exports = router;