const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const { movieCreateValidate, movieDeleteValidate } = require('../middlewares/movieValidate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', auth, getMovies);

router.post('/', auth, movieCreateValidate, createMovie);

router.delete('/:movieId', auth, movieDeleteValidate, deleteMovie);

module.exports = router;
