const Person = require('../models/Person.js');
var ObjectId = require('mongodb').ObjectId;

async function getByPhone(number) {
  try {
    const userdata = await Person.find({ phonenum: number });
    return userdata;
  } catch (error) {
    throw error;
  }
}

async function getByName(name, surname) {
  try {
    const userdata = await Person.find({
      name: { $regex: name, $options: 'i' },
      surname: { $regex: surname, $options: 'i' },
    });
    return userdata;
  } catch (error) {
    throw error;
  }
}

async function addOnePerson(data) {
  try {
    const newPerson = await Person(data).save();
    return newPerson;
  } catch (error) {
    throw error;
  }
}

async function deleteOnePerson(personID) {
  try {
    const DeletedPerson = await Person.findByIdAndDelete(personID);
    return DeletedPerson;
  } catch (error) {
    throw error;
  }
}

async function updateOnePerson(data) {
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
    const UpdatedPerson = await Person.updateOne(filter, updateData);
    return UpdatedPerson;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getByName,
  getByPhone,
  addOnePerson,
  deleteOnePerson,
  updateOnePerson,
};
