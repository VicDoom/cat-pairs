import { Reply } from '../models/Reply';
import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';

class ReplyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId, text } = req.body;
      const reply = await Reply.create({ commentId, text });
      if (!reply) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(reply);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
  async getAllCommentReply(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const replys = await Reply.findAll({ where: { commentId: id } });
    if (!replys) {
      return next(ApiError.internal('Не удалось получить ответы по этому id'));
    }
    return res.json(replys);
  }
}
export const replyController = new ReplyController();
