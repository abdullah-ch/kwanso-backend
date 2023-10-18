import { Model, Document } from 'mongoose'; // Assuming you are using Mongoose for MongoDB
const { taskModel } = require("../mongodb/model");


interface TaskDocument extends Document  {
  userId: string;
  name: string;
  id: string
}

type TaskPayload = {
  name : string,
  userId: string
}

// Define a TypeScript model type for the task model
type TaskModel = Model<TaskDocument>;

/**
 * Saves a task to the database.
 * @param {object} payload - The task data to be saved.
 * @returns {TaskDocument} - The saved task.
 */
const saveTask = async (payload: TaskPayload): Promise<TaskDocument> => {
  const task = await new taskModel(payload).save();
  return task;
};

/**
 * Retrieves all tasks from the database for a specific user.
 * @param {string} userId - The ID of the user to retrieve tasks for.
 * @returns {Promise<Array<TaskDocument>>} - An array of tasks belonging to the specified user.
 */
const getTaskByUserId = async (userId: string): Promise<Array<TaskDocument>> => {
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

// Export the functions and types
export {
  saveTask,
  getTaskByUserId,
  TaskDocument,
  TaskModel,
};
