//this file contains all the models
const mongoose = require("mongoose");
const userSchema = require("./schema/user");
const taskSchema = require("./schema/task");

const userModel = mongoose.model("users", userSchema);
const taskModel = mongoose.model("tasks", taskSchema);

module.exports = {
  userModel,
  taskSchema,
};
