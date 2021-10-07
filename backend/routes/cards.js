const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validUrl = require('../utils/validUrl');
const validIdParams = require('../utils/validIdParams');

const {
  getCards, createCard, deleteCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', celebrate(validIdParams('cardId')), deleteCardId);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validUrl),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate(validIdParams('cardId')), likeCard);
router.delete('/:cardId/likes', celebrate(validIdParams('cardId')), dislikeCard);

module.exports = router;
