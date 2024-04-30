import { Router } from 'express';
import { topicController } from '../controllers/topicController';
import { topicValidator } from '../middleware/Validator';
const topicRouter = Router();

topicRouter.post('/create', topicValidator, topicController.create);
topicRouter.get('/getAll', topicController.getAllTopics);
export default topicRouter;
