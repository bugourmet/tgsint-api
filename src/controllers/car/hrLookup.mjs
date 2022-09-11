import carLookUpService from '../../services/carLookUp.service.mjs';
import constants from '../../utils/const.mjs';

const hrLookUp = async (req, res) => {
  try {
    const { plates } = req.query;
    carLookUpService
      .hrCheck(plates.toUpperCase())
      .then(function (response) {
        res.status(201).json({ status: 'OK', data: response.data });
      })
      .catch(function (error) {
        res
          .status(201)
          .json({ status: 'FAILED', data: 'Vehicle details not found!' });
      });
  } catch (error) {
    switch (error.message) {
      case constants.errors.NO_PLATES: {
        res.status(400).json({ data: 'Missing plates param' });
        break;
      }
      default: {
        res.status(400).json({ data: 'Something went wrong.' });
        break;
      }
    }
  }
};

export default hrLookUp;
