const { INTERNAL_SERVER } = require("../constants/errorCodes");
const { saveTask, getTaskByUserId } = require("../services/task");
const AppError = require("../utils/error");

const createTask = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = req.user;

    const payload = {
      name,
      userId: user.id,
    };

    const createdTask = await saveTask(payload);
    const { name: taskName, _id } = createdTask;
    return res.status(200).send({
      task: {
        name: taskName,
        id: _id,
      },
    });
  } catch (error) {
    return next(
      new AppError({ message: "Something went wrong !" }, INTERNAL_SERVER)
    );
  }
};
/**
Returns: { tasks: [{ id: 1, name: "Task name" }, { id: 2, name: "Second task" }] }
 */
const getTasks = async (req, res, next) => {
  try {
    const user = req.user;

    const tasks = await getTaskByUserId(user.id);
    return res.status(200).send({
      tasks,
    });
  } catch (error) {
    return next(
      new AppError({ message: "Something went wrong !" }, INTERNAL_SERVER)
    );
  }
};

module.exports = {
  createTask,
  getTasks,
};
