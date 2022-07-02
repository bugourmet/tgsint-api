import carLookUpService from '../../services/carLookUp.service.mjs';

const vinLookUp = async (req, res) => {
  try {
    const { number, month } = req.query;
    carLookUpService.vinCheck(number, month).then(function (response) {
      res.status(201).json({ status: 'OK', data: response.data });
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default vinLookUp;
