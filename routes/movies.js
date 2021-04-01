const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getSavedFilms, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getSavedFilms);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Обязательное поле',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    image: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/).messages({
      'any.required': 'Обязательное поле',
      'string.pattern.base': 'Требуется ввести URL',
    }),
    trailer: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/).messages({
      'any.required': 'Обязательное поле',
      'string.pattern.base': 'Требуется ввести URL',
    }),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/).messages({
      'any.required': 'Обязательное поле',
      'string.pattern.base': 'Требуется ввести URL',
    }),
    nameRU: Joi.string().required().pattern(/^[А-Яа-яA-Za-z\s\W]{1,}$/).messages({
      'any.required': 'Обязательное поле',
      'string.pattern.base': 'Требуется ввести символы русского алфавита',
    }),
    nameEN: Joi.string().required().pattern(/^[A-Za-z\s\W]{1,}$/).messages({
      'any.required': 'Обязательное поле',
      'string.pattern.base': 'Требуется ввести символы английского алфавита',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Обязательное поле',
    }),
  }),
}), createFilm);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).messages({
      'string.hex': 'Требуется ввести HEX строку',
      'string.length': 'Требуется ввести 24 символа',
    }),
  }),
}), deleteFilm);

module.exports = router;
