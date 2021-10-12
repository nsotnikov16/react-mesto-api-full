const Card = require('../models/card');
const reqSuccess = require('../utils/successfulRequest');
const ForbiddenError = require('../utils/classesErrors/ForbiddenError');
const NotFoundError = require('../utils/classesErrors/NotFoundError');
const BadRequestError = require('../utils/classesErrors/BadRequestError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      reqSuccess(res, card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => reqSuccess(res, cards))
    .catch(next);
};

module.exports.deleteCardId = (req, res, next) => {
  Card.findById(req.params.cardId).then((card) => {
    if (!card) {
      return next(new NotFoundError('Карточка с указанным _id не найдена'));
    }
    if (req.user._id !== String(card.owner)) {
      return next(new ForbiddenError('Доступ запрещен'));
    }

    return Card.findByIdAndRemove(req.params.cardId)
      .then(() => {
        reqSuccess(res, { message: 'Card deleted' });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные в метод удаления карточки');
        }
      })
      .catch(next);
  });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).then((data) => {
  if (!data) {
    return next(new NotFoundError('Карточка с указанным _id не найдена'));
  }
  return reqSuccess(res, data);
})
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Переданы некорректные данные для постановки/снятии лайка');
    }
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((data) => {
  if (!data) {
    return next(new NotFoundError('Карточка с указанным _id не найдена'));
  }
  return reqSuccess(res, data);
})
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Переданы некорректные данные для постановки/снятии лайка');
    }
  })
  .catch(next);
