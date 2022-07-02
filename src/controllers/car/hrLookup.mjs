import carLookUpService from '../../services/carLookUp.service.mjs';

const hrLookUp = async (req, res) => {
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
      carLookUpService
        .hrCheck(plates)
        .then(function (response) {
          res.status(201).json({ status: 'OK', data: response.data });
        })
        .catch(function (error) {
          res
            .status(201)
            .json({ status: 'FAILED', data: 'Vehicle details not found!' });
        });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default hrLookUp;
