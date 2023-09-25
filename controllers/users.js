const bcrypt = require('bcryptjs');

const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const { createToken } = require('../utils/jwt');
const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/httpStatusCodes');
const { ERROR_MESSAGE_BAD_DATA, ERROR_MESSAGE_CONFLICT_EMAIL, ERROR_MESSAGE_USER_NOT_FOUND } = require('../utils/errorMessages');
const { SUCCESS_MESSAGE_LOGIN, SUCCESS_MESSAGE_LOGOUT } = require('../utils/successMessages');

const createUser = ((req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          const {
            name, email, _id,
          } = user;
          res.status(STATUS_CODE_CREATED).send({
            name, email, _id,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict(ERROR_MESSAGE_CONFLICT_EMAIL));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequest(ERROR_MESSAGE_BAD_DATA));
            return;
          }
          next(err);
        });
    })
    .catch(next);
});

const updateUser = ((req, res, next) => {
  // const { name, about } = req.body;
  User.findByIdAndUpdate(res.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound(ERROR_MESSAGE_USER_NOT_FOUND);
      }
      const { name, email } = user;
      res.status(STATUS_CODE_OK).send({ name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(ERROR_MESSAGE_CONFLICT_EMAIL));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_MESSAGE_BAD_DATA));
        return;
      }
      next(err);
    });
});

const login = ((req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = createToken(user);

      return res.cookie('jwt', token, {
        maxAge: 3600 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: SUCCESS_MESSAGE_LOGIN });
    })
    .catch(next);
});

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt')
      .status(STATUS_CODE_OK).send({ message: SUCCESS_MESSAGE_LOGOUT });
  } catch (err) {
    next(err);
  }
};

const getUser = ((req, res, next) => {
  User.findById(res.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(ERROR_MESSAGE_USER_NOT_FOUND);
      }
      const { name, email } = user;
      res.status(STATUS_CODE_OK).send({ name, email });
    })
    .catch(next);
});

module.exports = {
  createUser,
  updateUser,
  login,
  logout,
  getUser,
};
