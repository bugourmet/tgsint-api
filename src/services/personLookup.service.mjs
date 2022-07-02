import ObjectId from 'mongoose';
import person from '../models/person.mjs';

async function getByPhone(number) {
  try {
    const userdata = await person.find({ phonenum: number });
    return userdata;
  } catch (error) {
    throw error;
  }
}

async function getByName(name, surname) {
  try {
    const userdata = await person.find({
      name: { $regex: name, $options: 'i' },
      surname: { $regex: surname, $options: 'i' },
    });
    return userdata;
  } catch (error) {
    throw error;
  }
}

async function add(data) {
  try {
    const newPerson = await person(data).save();
    return newPerson;
  } catch (error) {
    throw error;
  }
}

async function remove(personID) {
  try {
    const DeletedPerson = await person.findByIdAndDelete(personID);
    return DeletedPerson;
  } catch (error) {
    throw error;
  }
}

async function update(data) {
  try {
    const updateData = {
      $set: {
        _id: data._id,
        phonenum: data.phonenum,
        fbid: data.fbid,
        name: data.name,
        surname: data.surname,
        sex: data.sex,
        extra: data.extra,
      },
    };
    const filter = { _id: ObjectId(data._id) };
    const UpdatedPerson = await person.updateOne(filter, updateData);
    return UpdatedPerson;
  } catch (error) {
    throw error;
  }
}

export default {
  getByName,
  getByPhone,
  add,
  remove,
  update,
};
