import personService from '../../services/personLookup.service.mjs';

const findByPhone = async (req, res) => {
  try {
    const { number } = req.query;
    if (number.length < 8) {
      res.status(400).json({
        status: 'FAILED',
        data: {
          error:
            "Length of the following keys should be greater than 2 characters : 'phone",
        },
      });
    } else {
      personService.getByPhone(number).then((result) => {
        if (result.length == 0 || result === undefined) {
          res.status(201).json({ status: 'FAILED', data: 'User not found!' });
        } else {
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

export default findByPhone;
