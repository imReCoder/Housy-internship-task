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

export function validateLogin(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateSendVerificationCode(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required()
  });
  return schema.validate(body);
}

export function validateVerifyEmail(body) {
  const schema = Joi.object({
    token: Joi.string().min(10).required(),
    code: Joi.string().length(4).required()
  });
  return schema.validate(body);
}

export function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required()
  });
  return schema.validate(body);
}

export function validateForgotPassword(body) {
  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateChangePassword(body) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateEditUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24),
    username: Joi.string().min(3).max(15),
    language: Joi.string().valid('tr', 'en'),
    gender: Joi.string().valid('male', 'female', 'other'),
    birthDate: Joi.date()
  });
  return schema.validate(body);
} 