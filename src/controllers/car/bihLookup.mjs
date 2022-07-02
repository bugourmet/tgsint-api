import carLookUpService from '../../services/carLookUp.service.mjs';
import cheerio from 'cheerio';

const bihLookUp = async (req, res) => {
  try {
    const { plates } = req.query;
    if (!plates) {
      res.status(400).json({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request: 'plates'",
        },
      });
    } else {
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
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default bihLookUp;
