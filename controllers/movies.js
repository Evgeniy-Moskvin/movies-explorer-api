const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/httpStatusCodes');

const getMovies = ((req, res, next) => {
  const owner = req.user._id;
  return Movie.find({ owner })
    .then((movies) => {
      res.status(STATUS_CODE_OK).send(movies);
    })
    .catch(next);
});

const createMovie = ((req, res, next) => {
  const movieData = req.body;
  movieData.owner = req.user._id;
  return Movie.create(movieData)
    .then((movie) => {
      res.status(STATUS_CODE_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      next(err);
    });
});

const deleteMovie = ((req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound(`Фильм с id ${req.params.movieId} не найден`);
    })
    .then((movie) => {
      if (res.user._id !== movie.owner.toString()) {
        next(new Forbidden('Нет прав для удаления фильма'));
        return;
      }
      Movie.findByIdAndRemove(movie._id)
        .then((removeMovie) => {
          res.status(STATUS_CODE_OK).send(removeMovie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id'));
        return;
      }
      next(err);
    });
});

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
