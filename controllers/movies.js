const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/httpStatusCodes');
const {
  ERROR_MESSAGE_BAD_DATA,
  ERROR_MESSAGE_FILM_NOT_FOUND,
  ERROR_MESSAGE_FORBIDDEN_DELETE_FILM,
  ERROR_MESSAGE_BAD_ID,
} = require('../utils/errorMessages');
// const Conflict = require('../errors/Conflict');

const getMovies = ((req, res, next) => {
  const owner = res.user._id;
  return Movie.find({ owner })
    .then((movies) => {
      res.status(STATUS_CODE_OK).send(movies);
    })
    .catch(next);
});

const createMovie = ((req, res, next) => {
  const movieData = req.body;
  movieData.owner = res.user._id;
  return Movie.create(movieData)
    .then((movie) => {
      res.status(STATUS_CODE_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_MESSAGE_BAD_DATA));
        return;
      }
      next(err);
    });
});

const deleteMovie = ((req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound(ERROR_MESSAGE_FILM_NOT_FOUND);
    })
    .then((movie) => {
      if (res.user._id !== movie.owner.toString()) {
        next(new Forbidden(ERROR_MESSAGE_FORBIDDEN_DELETE_FILM));
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
        next(new BadRequest(ERROR_MESSAGE_BAD_ID));
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
