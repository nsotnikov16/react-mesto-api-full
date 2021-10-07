const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validIdParams = require('../utils/validIdParams');
const validUrl = require('../utils/validUrl');
const {
  getUsers, getUserId, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(validIdParams('userId')), getUserId);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validUrl),
  }),
}), updateAvatar);

module.exports = router;
