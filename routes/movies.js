const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getSavedFilms, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getSavedFilms);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/),
    trailer: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/),
    nameRU: Joi.string().required().pattern(/^[А-Яа-я\s]{1,}$/),
    nameEN: Joi.string().required().pattern(/^[A-Za-z\s]{1,}$/),
  }),
}), createFilm);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
}), deleteFilm);

module.exports = router;
