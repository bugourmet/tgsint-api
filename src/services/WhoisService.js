const whois = require('whoiser');

async function getDomainInfo(domain) {
  try {
    let domainInfo = await whois(domain);
    let result = { status: 'OK', data: domainInfo };
    return result;
  } catch (error) {
    let result = {
      status: 'FAILED',
      data: { error: `TLD '${domain}' not found!` || error },
    };
    return result;
  }
}

module.exports = {
  getDomainInfo,
};
