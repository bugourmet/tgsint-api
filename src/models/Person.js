const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  phonenum: {
    type: String,
    required: true,
  },
  fbid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: false,
  },
  extra: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Persons', PersonSchema);
