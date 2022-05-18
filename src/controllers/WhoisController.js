const WhoisService = require('../services/WhoisService');

const whoisQuery = (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request: 'domain'",
        },
      });
    } else {
      WhoisService.getDomainInfo(domain).then((result) => res.send(result));
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = {
  whoisQuery,
};
