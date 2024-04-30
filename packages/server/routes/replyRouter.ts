import { Router } from 'express';
import { replyController } from '../controllers/replayController';
import { replyValidator } from '../middleware/Validator';
const replyRouter = Router();

replyRouter.post('/create', replyValidator, replyController.create);
replyRouter.get('/getAll/:id', replyController.getAllCommentReply);

export default replyRouter;
