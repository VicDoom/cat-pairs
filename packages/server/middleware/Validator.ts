import { Joi, celebrate } from 'celebrate';

export const topicValidator = celebrate({
  body: Joi.object().keys({
    topicName: Joi.string().required().min(2).max(100),
    description: Joi.string().required().min(2).max(300),
  }),
});

export const commentValidator = celebrate({
  body: Joi.object().keys({
    topicId: Joi.number().required(),
    text: Joi.string().required().min(2).max(500),
  }),
});

export const replyValidator = celebrate({
  body: Joi.object().keys({
    commentId: Joi.number().required(),
    text: Joi.string().required().min(2).max(500),
  }),
});
