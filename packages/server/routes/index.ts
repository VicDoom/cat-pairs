import { Router } from 'express';
import topicRouter from './topicRouter';
import commentRouter from './commetRouter';
import replyRouter from './replyRouter';

const router = Router();
router.use('/topic', topicRouter);
router.use('/comment', commentRouter);
router.use('/reply', replyRouter);

export default router;
