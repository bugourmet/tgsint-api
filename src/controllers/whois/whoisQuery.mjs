import whoisService from '../../services/whois.service.mjs';
import constants from '../../utils/const.mjs';

const whoisQuery = async (req, res) => {
  try {
    const { domain } = req.query;
    whoisService.getDomainInfo(domain).then((result) => res.json(result));
  } catch (error) {
    switch (error.message) {
      case constants.errors.NO_DOMAIN: {
        res.status(400).json({ data: 'Missing target domain.' });
        break;
      }
      default: {
        console.log(error);
        res.status(400).json({ data: 'Something went wrong.' });
        break;
      }
    }
  }
};

export default whoisQuery;
