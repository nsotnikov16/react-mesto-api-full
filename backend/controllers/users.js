const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const reqSuccess = require('../utils/successfulRequest');
const ConflictError = require('../utils/classesErrors/ConflictError');
const NotFoundError = require('../utils/classesErrors/NotFoundError');
const UnauthorizedError = require('../utils/classesErrors/UnauthorizedError');
const BadRequestError = require('../utils/classesErrors/BadRequestError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => reqSuccess(res, users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return User.findOne({ email }).then((mail) => {
    if (mail) next(new ConflictError('Такой пользователь уже существует!'));
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) next(err);
      return User.create({
        name, about, avatar, email, password: hash,
      }).then((user) => reqSuccess(res, user))
        .catch((error) => {
          if (error.name === 'ValidationError') {
            throw new BadRequestError('Переданы некорректные данные при создании профиля');
          }
        })
        .catch(next);
    });
  });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
      }
      return reqSuccess(res, user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные при получении пользователя по _id');
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        reqSuccess(res, user);
      }
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        throw new BadRequestError('Переданы некорректные данные при обновлении профиля');
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        reqSuccess(res, user);
      }
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
    res.send({ token });
  })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    if (!user) throw new UnauthorizedError('Необходима авторизация');
    reqSuccess(res, user);
  }).catch(next);
};
