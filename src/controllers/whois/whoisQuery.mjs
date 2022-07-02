import whoisService from '../../services/whois.service.mjs';

const whoisQuery = async (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) {
      res.status(400).json({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request: 'domain'",
        },
      });
    } else {
      whoisService.getDomainInfo(domain).then((result) => res.json(result));
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default whoisQuery;
