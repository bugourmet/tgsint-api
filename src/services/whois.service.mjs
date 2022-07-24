import whois from 'whoiser';
import constants from '../utils/const.mjs';

async function getDomainInfo(domain) {
  try {
    if (!domain) {
      throw new Error(constants.errors.NO_DOMAIN);
    }
    const domainInfo = await whois(domain);
    const result = { status: 'OK', data: domainInfo };
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default {
  getDomainInfo,
};

// TODO error handling and test with invalid TLD's
