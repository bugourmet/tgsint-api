import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: false,
  },
  extra: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Persons", PersonSchema);
