const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', auth, getMovies);

router.post('/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    image: Joi.string().required().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
    trailerLink: Joi.string().required().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
    thumbnail: Joi.string().required().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', auth, celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(24).max(24)
      .hex(),
  }),
}), deleteMovie);

module.exports = router;
