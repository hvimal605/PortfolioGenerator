const Joi = require('joi');
const { ErrorHandler } = require('./errorMiddleware');

/**
 * A middleware factory for validating request data against a Joi schema.
 * @param {Joi.Schema} schema - The Joi schema to validate against.
 * @param {string} property - The property of the request to validate (body, params, or query).
 * @returns {Function} - The Express middleware function.
 */
const validateSchema = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false, // Return all errors, not just the first one
      allowUnknown: true, // Allow other fields that aren't in the schema
      stripUnknown: true, // Remove extra fields that are NOT in the schema (Auto-Sanitization)
    });

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message.replace(/"/g, ''))
        .join(', ');
      
      return next(new ErrorHandler(errorMessage, 400));
    }

    next();
  };
};

module.exports = validateSchema;
