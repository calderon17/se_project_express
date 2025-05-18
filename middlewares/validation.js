const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The "name" field must be at least 2 characters',
      "string.max": 'The "name" field must be less than 30 characters',
    }),
    avatar: Joi.string().required().uri().messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The "name" field must be at least 2 characters',
      "string.max": 'The "name" field must be less than 30 characters',
    }),
    imageUrl: Joi.string().required().uri().messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").messages({
      "any.only": 'The "weather" field must be either "hot", "warm", or "cold"',
    }),
  }),
});

const validateIds = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).messages({
      "string.empty": 'The "userId" field must be filled in',
      "string.hex": 'The "userId" field must be a hexadecimal value',
      "string.length": 'The "userId" field must be 24 characters',
    }),
    itemId: Joi.string().hex().length(24).messages({
      "string.empty": 'The "itemId" field must be filled in',
      "string.hex": 'The "itemId" field must be a hexadecimal value',
      "string.length": 'The "itemId" field must be 24 characters',
    }),
  }),
});

module.exports = {
  validateAuthentication,
  validateUserInfo,
  validateClothingItem,
  validateIds,
  validateURL,
};
