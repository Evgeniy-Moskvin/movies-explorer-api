const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/NotFound');
const { auth } = require('../middlewares/auth');
const { ERROR_MESSAGE_NOT_FOUND } = require('../utils/errorMessages');

router.use('/', userRouter);
router.use('/movies', movieRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFound(ERROR_MESSAGE_NOT_FOUND));
});

module.exports = router;
