const Joi = require('joi');

const signupSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
  }),
  lastName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
  }),
  email: Joi.string().email().trim().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(8).max(100).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password is required',
  }),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required',
  }),
  accountType: Joi.string().valid('Admin', 'User', 'Developer').required().messages({
    'any.only': 'Invalid account type',
  }),
  otp: Joi.string().length(6).required().messages({
    'string.length': 'OTP must be exactly 6 characters',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

module.exports = { signupSchema, loginSchema };
