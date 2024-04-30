import { Comment } from '../models/Comment';
import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';

class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId, text } = req.body;
      const comment = await Comment.create({ topicId, text });
      if (!comment) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(comment);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async getAllTopicComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const comments = await Comment.findAll({ where: { topicId: id } });
      if (!comments) {
        return next(
          ApiError.internal('Не удалось получить комметарии по этому id')
        );
      }
      return res.json(comments);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
}

export const commentController = new CommentController();
