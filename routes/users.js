const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getProfile, updateProfile } = require('../controllers/users');

router.get('/me', getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30)
      .pattern(/^[A-Za-zА-Яа-я]{1,}$/),
  }),
}), updateProfile);

module.exports = router;