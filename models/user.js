const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnAuthorized = require('../errors/UnAuthorized');
const { ERROR_MESSAGE_BAD_EMAIL, ERROR_MESSAGE_LOGIN } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,

    validate: {
      validator: ((v) => validator.isEmail(v)),
      message: ERROR_MESSAGE_BAD_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorized(ERROR_MESSAGE_LOGIN);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnAuthorized(ERROR_MESSAGE_LOGIN);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
