const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  deleteCard, createCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};
cardsRouter.get('/cards', getCards);
cardsRouter.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex(),
    }),
  }),
  deleteCard,
);
cardsRouter.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);
cardsRouter.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex(),
    }),
  }),
  likeCard,
);
cardsRouter.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex(),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRouter;
