const { taskModel } = require("../mongodb/model");

/**
 * Saves a task to the database.
 * @param {object} payload - The task data to be saved.
 * @returns {object} - The saved task.
 */
const saveTask = async (payload) => {
  const task = await new taskModel(payload).save();
  return task;
};

/**
 * Retrieves all tasks from the database for a specific user.
 * @param {string} userId - The ID of the user to retrieve tasks for.
 * @returns {Array<object>} - An array of tasks belonging to the specified user.
 */
const getTaskByUserId = async (userId) => {
  const tasks = await taskModel.find(
    { userId },
    {
      name: 1,
      _id: 0, // Exclude the default '_id' field
      id: "$_id", // Rename '_id' to 'id'
    }
  );
  return tasks;
};

module.exports = {
  saveTask,
  getTaskByUserId,
};
