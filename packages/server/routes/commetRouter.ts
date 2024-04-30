import { Router } from 'express';
import { commentController } from '../controllers/commentsController';
import { commentValidator } from '../middleware/Validator';

const commentRouter = Router();

commentRouter.post('/create', commentValidator, commentController.create);
commentRouter.get('/getAll/:id', commentController.getAllTopicComment);
export default commentRouter;
