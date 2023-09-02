const { celebrate, Joi } = require('celebrate');

const movieCreateValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
    trailerLink: Joi.string().required().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
    thumbnail: Joi.string().required().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieDeleteValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(24).max(24)
      .hex(),
  }),
});

module.exports = {
  movieCreateValidate,
  movieDeleteValidate,
};
