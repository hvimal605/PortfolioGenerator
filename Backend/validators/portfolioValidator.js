const Joi = require('joi');

const createPortfolioSchema = Joi.object({
  templateId: Joi.string().required().messages({
    'any.required': 'Template ID is required',
  }),
  FirstName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
  }),
  LastName: Joi.string().trim().allow('', null),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
  }),
  phone: Joi.string().min(10).max(15).required().messages({
    'string.empty': 'Phone number is required',
  }),
  aboutme: Joi.string().allow('', null),
  roles: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string().allow('')
  ),
  socialLinks: Joi.alternatives().try(
    Joi.array().items(Joi.string()), // Expecting strings that will be JSON parsed
    Joi.string()
  ),
});

const updatePortfolioSchema = Joi.object({
  portfolioId: Joi.string().required(),
  FirstName: Joi.string().trim().min(2).max(50),
  LastName: Joi.string().trim().allow('', null),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(15),
  aboutme: Joi.string().allow('', null),
  roles: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string().allow('')
  ),
  socialLinks: Joi.alternatives().try(
    Joi.array().items(Joi.any()),
    Joi.string().allow('')
  ),
});

module.exports = { createPortfolioSchema, updatePortfolioSchema };
