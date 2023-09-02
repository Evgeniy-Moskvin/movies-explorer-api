const mongoose = require('mongoose');
const validator = require('validator');

const { ERROR_MESSAGE_BAD_URL } = require('../utils/errorMessages');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,

    validate: {
      validator: ((v) => validator.isURL(v)),
      message: ERROR_MESSAGE_BAD_URL,
    },
  },
  trailerLink: {
    type: String,
    required: true,

    validate: {
      validator: ((v) => validator.isURL(v)),
      message: ERROR_MESSAGE_BAD_URL,
    },
  },
  thumbnail: {
    type: String,
    required: true,

    validate: {
      validator: ((v) => validator.isURL(v)),
      message: ERROR_MESSAGE_BAD_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', cardSchema);
