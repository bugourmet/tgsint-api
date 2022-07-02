import personService from '../../services/personLookup.service.mjs';

const findByName = async (req, res) => {
  try {
    const { name, surname } = req.query;
    if (name.length < 2 || surname.length < 2) {
      res.status(400).json({
        status: 'FAILED',
        data: {
          error:
            "Length of the following keys should be greater than 2 characters : 'name','surname'",
        },
      });
    } else {
      personService.getByName(name, surname).then((result) => {
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

export default findByName;
