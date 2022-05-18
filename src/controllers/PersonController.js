const PersonService = require('../services/PersonService');

const findByName = (req, res) => {
  try {
    const { name, surname } = req.query;
    if (name.length < 2 || surname.length < 2) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error:
            "Length of the following keys should be greater than 2 characters : 'name','surname'",
        },
      });
    } else {
      PersonService.getByName(name, surname).then((result) => {
        if (result.length == 0 || result === undefined) {
          res.status(201).send({ status: 'FAILED', data: 'User not found!' });
        } else {
          res.status(201).send({ status: 'OK', data: result });
        }
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const findByPhone = (req, res) => {
  try {
    const { number: phonenumber } = req.query;
    if (!phonenumber) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error: "'number' key is missing or is empty in the request .",
        },
      });
    } else {
      PersonService.getByPhone(phonenumber).then((result) => {
        if (result.length == 0 || result === undefined) {
          res.status(201).send({ status: 'FAILED', data: 'User not found!' });
        } else {
          res.status(201).send({ status: 'OK', data: result });
        }
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
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
      status: 'FAILED',
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
    extra: body.extra,
  };

  try {
    PersonService.addOnePerson(personData).then((result) => {
      if (result === null || result === undefined) {
        res
          .status(201)
          .send({ status: 'FAILED', data: 'Could not add a new user!' });
      } else {
        res.status(201).send({
          status: 'OK',
          data: `Successfully added a new person! '${result}'`,
        });
      }
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const deletePerson = (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error: "'id' key is missing or is empty in the request .",
        },
      });
    } else {
      PersonService.deleteOnePerson(id).then((result) => {
        if (result === null || result === undefined) {
          res.status(201).send({ status: 'FAILED', data: 'User not found!' });
        } else {
          res.status(201).send({
            status: 'OK',
            data: `id: ${result._id} successfully deleted!`,
          });
        }
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const updatePerson = (req, res) => {
  const { body } = req;
  if (
    !body._id ||
    !body.phonenum ||
    !body.fbid ||
    !body.name ||
    !body.surname ||
    !body.sex
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'phonenum', 'fbid', 'name', 'surname', 'sex'",
      },
    });
  }

  const personData = {
    _id: body._id,
    phonenum: body.phonenum,
    fbid: body.fbid,
    name: body.name,
    surname: body.surname,
    sex: body.sex,
    extra: body.extra,
  };

  try {
    PersonService.updateOnePerson(personData).then((result) => {
      if (result === null || result === undefined) {
        res
          .status(201)
          .send({ status: 'FAILED', data: 'User could not be updated!' });
      } else {
        res.status(201).send({
          status: 'OK',
          data: `${result.matchedCount} user matched, updated successfully.`,
        });
      }
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = {
  findByName,
  findByPhone,
  addPerson,
  deletePerson,
  updatePerson,
};
