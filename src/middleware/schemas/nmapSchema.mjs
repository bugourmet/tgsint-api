import joi from 'joi';

const scanTarget = joi.object().keys({
  target: joi.string().min(3).required(),
});

export default { scanTarget };
