import person from '../models/person.mjs';
import constants from '../utils/const.mjs';

async function getByPhone(number) {
  if (!number) {
    throw new Error(constants.errors.NO_PHONE);
  }
  const userdata = await person.find({ phonenum: number });
  return userdata;
}

async function getByName(name, surname) {
  if (!name || !surname) {
    throw new Error(constants.errors.DATA_ERROR);
  }
  const userdata = await person.find({
    name: { $regex: name, $options: 'i' },
    surname: { $regex: surname, $options: 'i' },
  });
  return userdata;
}

export default {
  getByName,
  getByPhone,
};
