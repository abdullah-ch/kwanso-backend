import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import { INTERNAL_SERVER } from '../constants/errorCodes';
// @ts-ignore
import { saveTask, getTaskByUserId, TaskDocument } from '../services/task';
// @ts-ignore
import AppError from '../utils/error';

interface Task {
  name: string;
  id: string;
}

interface User {
  id: string;
  // Add other user-related properties here if needed
}

interface IReq extends Request {
  user: User

}

export const createTask = async (req: IReq, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const user: User = req.user;

    const payload = {
      name,
      userId: user.id,
    };

    const createdTask: TaskDocument = await saveTask(payload);
    const { name: taskName, id } = createdTask;
    return res.status(200).send({
      task: {
        name: taskName,
        id,
      },
    });
  } catch (error) {
    return next(
      new AppError({ message: 'Something went wrong !' }, INTERNAL_SERVER)
    );
  }
};

export const getTasks = async (req: IReq, res: Response, next: NextFunction) => {
  try {
    const user: User = req.user;

    const tasks: Task[] = await getTaskByUserId(user.id);
    return res.status(200).send({
      tasks,
    });
  } catch (error) {
    return next(
      new AppError({ message: 'Something went wrong !' }, INTERNAL_SERVER)
    );
  }
};
