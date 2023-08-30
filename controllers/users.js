const bcrypt = require('bcryptjs');

const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const { createToken } = require('../utils/jwt');
const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/httpStatusCodes');

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
            next(new Conflict(`Пользователь с email ${req.body.email} уже зарегистрирован!`));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequest('Некорректные данные!'));
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
        throw new NotFound(`Пользователь с id ${req.params.userId} не найден`);
      }
      const { name, email } = user;
      res.status(STATUS_CODE_OK).send({ name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(`Пользователь с email ${req.body.email} уже зарегистрирован!`));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
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
      }).send({ message: 'Успешный вход' });
    })
    .catch(next);
});

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt')
      .status(STATUS_CODE_OK).send({ message: 'Успешный выход' });
  } catch (err) {
    next(err);
  }
};

const getUser = ((req, res, next) => {
  User.findById(res.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь с id ${res.user._id} не найден`);
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
