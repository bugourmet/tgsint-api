import personService from '../../services/person.service.mjs';
import constants from '../../utils/const.mjs';

const findByName = async (req, res) => {
  try {
    const { name, surname } = req.query;
    personService.getByName(name, surname).then((result) => {
      if (result.length == 0 || result === undefined) {
        res.status(201).json({ status: 'FAILED', data: 'User not found!' });
      } else {
        res.status(201).json({ status: 'OK', data: result });
      }
    });
  } catch (error) {
    switch (error.message) {
      case constants.errors.DATA_ERROR: {
        res.status(400).json({ data: 'Missing person params' });
        break;
      }
      default: {
        res.status(400).json({ data: 'Something went wrong.' });
        break;
      }
    }
  }
};

export default findByName;
