import { Topic } from '../models/Topic';
import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';

class TopicController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicName, description } = req.body;
      const topic = await Topic.create({ topicName, description });
      if (!topic) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(topic);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async getAllTopics(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await Topic.findAll();
      if (!topics) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(topics);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
}
export const topicController = new TopicController();
