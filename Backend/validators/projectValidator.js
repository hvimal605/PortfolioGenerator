const Joi = require('joi');

const addProjectSchema = Joi.object({
  portfolioId: Joi.string().required().messages({
    'any.required': 'Portfolio ID is required',
  }),
  title: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'Project title is required',
  }),
  description: Joi.string().trim().min(10).required().messages({
    'string.empty': 'Project description is required',
  }),
  gitRepoLink: Joi.string().uri().required().messages({
    'string.uri': 'Invalid GitHub repository link',
  }),
  projectLink: Joi.string().uri().allow('', null),
  technologies: Joi.string().required(),
  stack: Joi.string().allow('', null),
  deployed: Joi.string().allow('', null),
});

const updateProjectSchema = Joi.object({
  projectId: Joi.string().required(),
  title: Joi.string().trim().min(3).max(100),
  description: Joi.string().trim().min(10),
  gitRepoLink: Joi.string().uri(),
  projectLink: Joi.string().uri().allow('', null),
  technologies: Joi.string(),
  stack: Joi.string().allow('', null),
  deployed: Joi.string().allow('', null),
  retainedBanners: Joi.string().allow('', null), 
});

module.exports = { addProjectSchema, updateProjectSchema };
