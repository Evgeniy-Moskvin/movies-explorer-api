const jwt = require('jsonwebtoken');
const UnAuthorized = require('../errors/UnAuthorized');
const { ERROR_MESSAGE_NEED_AUTHORIZATION } = require('../utils/errorMessages');

const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  if (!token) {
    next(new UnAuthorized(ERROR_MESSAGE_NEED_AUTHORIZATION));
    return;
  }

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnAuthorized(ERROR_MESSAGE_NEED_AUTHORIZATION));
    return;
  }

  res.user = payload;

  next();
};
module.exports = {
  auth,
};
