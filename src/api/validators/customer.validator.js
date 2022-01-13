import Joi from 'joi';

export function validateAddCustomer(req, res, next) {
  const body = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(24).required(),
    email: Joi.string().email().min(3).required(),
    gender: Joi.string().min(1).max(6).required(),
    city: Joi.string().min(3).max(24).required(),

  });
  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return next()
}

export function validateSendNotification(req, res, next) {
  const body = req.body;
  const schema = Joi.object({
    title: Joi.string().min(3).max(24).required(),
    description: Joi.string().min(3).max(24).required(),
   
  });
  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return next()
}


/**
* @swagger
* components:
*   schemas:
*     Customer:
*       type: object
*       properties:
*         email:
*           type: string
*         name:
*           type: string
*         registrationToken:
*           type: string
*         gender:
*           type: string
*           enum: ['male', 'female', 'other']
*       
*/