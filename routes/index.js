const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/NotFound');
const { auth } = require('../middlewares/auth');

router.use('/', userRouter);
router.use('/movies', movieRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFound('Ресурс не найден или был удален'));
});

module.exports = router;
