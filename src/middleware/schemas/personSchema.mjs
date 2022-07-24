import joi from 'joi';

const addOrUpdate = joi.object().keys({
  _id: joi.string().required(),
  phonenum: joi.number().integer().min(8).max(15).required(),
  fbid: joi.number().integer().required(),
  name: joi.string().min(2).max(20).required(),
  surname: joi.string().min(2).max(20).required(),
  sex: joi.string().valid('male', 'female').required(),
  extra: joi.string().max(100),
});

const remove = joi.object().keys({
  _id: joi.string().required(),
});

const getByName = joi.object().keys({
  name: joi.string().min(2).max(20).required(),
  surname: joi.string().min(2).max(20).required(),
});

const getByPhone = joi.object().keys({
  number: joi.string().min(8).max(15).regex(/^\d+$/).required(),
});

export default {
  addOrUpdate,
  remove,
  getByName,
  getByPhone,
};
