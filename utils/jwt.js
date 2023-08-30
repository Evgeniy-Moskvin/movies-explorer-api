const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const createToken = ((user) => jwt.sign(
  { _id: user._id },
  NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
  { expiresIn: '7d' },
));

module.exports = {
  createToken,
};
