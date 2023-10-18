const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { createTask, getTasks } = require("../controllers/task");
const { taskCreationRules, validate } = require("../validations");
const taskRouter = express.Router();

taskRouter.post(
  "/create-task",
  taskCreationRules(),
  validate,
  verifyToken,
  createTask
);
taskRouter.get("/list-tasks", verifyToken, getTasks);

module.exports = taskRouter;
