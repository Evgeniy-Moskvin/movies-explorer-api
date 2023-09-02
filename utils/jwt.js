const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET } = require('../config');

const createToken = ((user) => jwt.sign(
  { _id: user._id },
  JWT_SECRET,
  { expiresIn: '7d' },
));

module.exports = {
  createToken,
};
