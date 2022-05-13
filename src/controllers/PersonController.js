const PersonService = require("../services/PersonService");

const findByName = (req, res) => {
  try {
    const name = req.query.name;
    const surname = req.query.surname;

    if (name.length < 2 || surname.length < 2){
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "Length of the following keys should be greater than 2 characters : 'name','surname'",
        },
      });
    }else{
      PersonService.getByName(name,surname).then(
        userdata => {
          if(userdata.length == 0 || userdata === undefined){
            res.status(201).send({ status: "FAILED", data: "User not found!" })
          }else{
            res.status(201).send({ status: "OK", data: userdata });
          }
        });
    }
  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const findByPhone = (req, res) => {
  try {
    const phonenumber = req.query.number;
    if (!phonenumber){
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request : 'number'",
        },
      });
    }else{
      PersonService.getByPhone(phonenumber).then(
        userdata => {
          if(userdata.length == 0 || userdata === undefined){
            res.status(201).send({ status: "FAILED", data: "User not found!" })
          }else{
            res.status(201).send({ status: "OK", data: userdata });
          }
        });
    }
  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const addPerson = (req, res) => {
  const { body } = req;
  if (
    !body.phonenum ||
    !body.fbid ||
    !body.name ||
    !body.surname ||
    !body.sex
  ) {
    res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'phonenum', 'fbid', 'name', 'surname', 'sex'",
        },
      });
  }

  const personData = {
    phonenum: body.phonenum,
    fbid: body.fbid,
    name: body.name,
    surname: body.surname,
    sex: body.sex,
    extra: body.extra
  };

  try {
    PersonService.addOnePerson(personData).then(
      userdata => {
        if(userdata === null || userdata === undefined){
          res.status(201).send({ status: "FAILED", data: "Could not add a new user!" })
        }else{
          res.status(201).send({ status: "OK", data: `Successfully added a new person! '${userdata}'`});
          
        }
      });
  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const deletePerson = (req, res) => {
  try {
    const personID = req.query.id;
    if (!personID){
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request : 'id'",
        },
      });
    }else{
      PersonService.deleteOnePerson(personID).then(
        userdata => {
          if(userdata === null || userdata === undefined){
            res.status(201).send({ status: "FAILED", data: "User not found!" })
          }else{
            res.status(201).send({ status: "OK", data: `id: ${userdata._id} successfully deleted!`});
            
          }
        });
    }
  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


module.exports = {
  findByName,
  findByPhone,
  addPerson,
  deletePerson,
};
