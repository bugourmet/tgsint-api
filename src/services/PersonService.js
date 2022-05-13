const Person = require('../models/Person.js');

const getByPhone = (number) =>{
try {
  const userdata = Person.find({'phonenum': number});
  return userdata;
} catch (error) {
  throw error;
}
};

const getByName = (name,surname) => {
  try {
    const userdata = Person.find({'name': { $regex: name,'$options' : 'i'},'surname':{ $regex: surname,'$options' : 'i'}});
    return userdata;
  } catch (error) {
    throw error;
  }
};

const addOnePerson = (data) => {
  try {
    const newPerson = Person(data).save()
    return newPerson;
  } catch (error) {
    throw error;
  }
};

const deleteOnePerson = (personID) => {
  try {
    const DeletedPerson = Person.findByIdAndDelete(personID)
    return DeletedPerson;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getByName,
  getByPhone,
  addOnePerson,
  deleteOnePerson,
};