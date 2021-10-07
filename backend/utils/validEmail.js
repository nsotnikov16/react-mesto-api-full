const { isEmail } = require('validator');
const BadRequestError = require('./classesErrors/BadRequestError');

module.exports = (value) => {
  const result = isEmail(value);
  if (result) {
    return value;
  }
  throw new BadRequestError('Email validation err');
};
