import personService from '../../services/person.service.mjs';
import constants from '../../utils/const.mjs';

const findByPhone = async (req, res) => {
  try {
    const { number } = req.query;
    personService.getByPhone(number).then((result) => {
      if (result.length == 0 || result === undefined) {
        res.status(201).json({ status: 'FAILED', data: 'User not found!' });
      } else {
        res.status(201).json({ status: 'OK', data: result });
      }
    });
  } catch (error) {
    switch (error.message) {
      case constants.errors.NO_PHONE: {
        res.status(400).json({ data: 'Missing phone param.' });
        break;
      }
      default: {
        res.status(400).json({ data: 'Something went wrong.' });
        break;
      }
    }
  }
};

export default findByPhone;
