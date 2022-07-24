import carLookUpService from '../../services/carLookUp.service.mjs';
import cheerio from 'cheerio';
import constants from '../../utils/const.mjs';

const bihLookUp = async (req, res) => {
  try {
    const { plates } = req.query;
    carLookUpService.bihCheck(plates).then(function (response) {
      const load = cheerio.load(response.data);
      const match = load.text();
      if (
        match.includes(
          'Za traženo vozilo se ne može pronaći podatak u bazi Biroa'
        )
      ) {
        return res
          .status(404)
          .json({ status: 'OK', data: 'Vehicle details not found!' });
      } else {
        const result = load('#mainForm').text();
        res.status(201).json({ status: 'OK', data: result });
      }
    });
  } catch (error) {
    switch (error.message) {
      case constants.error.NO_PLATES: {
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

export default bihLookUp;
