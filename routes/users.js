const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const { updateUserValidate, signupUserValidate, signinUserValidate } = require('../middlewares/userValidation');

const {
  createUser,
  updateUser,
  login,
  logout,
  getUser,
} = require('../controllers/users');

router.get('/users/me', auth, getUser);

router.patch('/users/me', auth, updateUserValidate, updateUser);

router.post('/signup', signupUserValidate, createUser);

router.post('/signin', signinUserValidate, login);

router.post('/signout', auth, logout);

module.exports = router;
