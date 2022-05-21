const execFile = require('child_process').execFile;
const command = `nmap`;

const pingScan = (req, res) => {
  try {
    const { target } = req.query;
    if (!target) {
      return res.send({
        status: 'FAILED',
        data: { error: 'Target not specified.' },
      });
    } else {
      args = ['-sn', target];
      execFile(command, args, (error, output) => {
        if (error) {
          return res.send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        return res.status(201).send({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const quickTraceroute = (req, res) => {
  try {
    const { target } = req.query;
    if (!target) {
      return res.send({
        status: 'FAILED',
        data: { error: 'Target not specified.' },
      });
    } else {
      args = ['-sn', '--traceroute', target];
      execFile(command, args, (error, output) => {
        if (error) {
          return res.send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        return res.status(201).send({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const intenseScan = (req, res) => {
  try {
    const { target } = req.query;
    if (!target) {
      return res.send({
        status: 'FAILED',
        data: { error: 'Target not specified.' },
      });
    } else {
      args = ['-T4', '-A', '-v', target];
      execFile(command, args, (error, output) => {
        if (error) {
          return res.send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        return res.status(201).send({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const intenseScanUDP = (req, res) => {
  try {
    const { target } = req.query;
    if (!target) {
      return res.send({
        status: 'FAILED',
        data: { error: 'Target not specified.' },
      });
    } else {
      args = ['-sS', '-sU', '-T4', '-A', '-v', target];
      execFile(command, args, (error, output) => {
        if (error) {
          return res.send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        return res.status(201).send({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const intenseScanTCP = (req, res) => {
  try {
    const { target } = req.query;
    if (!target) {
      return res.send({
        status: 'FAILED',
        data: { error: 'Target not specified.' },
      });
    } else {
      args = ['p', '1-65535', '-T4', '-A', '-v', target];
      execFile(command, args, (error, output) => {
        if (error) {
          return res.send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        returnres.status(201).send({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const quickScanPlus = (req, res) => {
  try {
    const { target } = req.query;
    if (!target) {
      return res.send({
        status: 'FAILED',
        data: { error: 'Target not specified.' },
      });
    } else {
      args = ['-sV', '-T4', '-O', '-F', '--version-light', target];
      execFile(command, args, (error, output) => {
        if (error) {
          return res.send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        return res.status(201).send({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const subdomainScan = (req, res) => {
  try {
    const { domain } = req.query;
    args = ['sn', '--script', 'hostmap-crtsh', domain];
    if (!domain) {
      return res.send({
        status: 'FAILED',
        data: { error: 'Domain not specified.' },
      });
    } else {
      execFile(command, args, (error, output) => {
        if (error) {
          return res.send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        return res.status(201).send({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = {
  pingScan,
  quickTraceroute,
  intenseScan,
  intenseScanTCP,
  intenseScanUDP,
  quickScanPlus,
  subdomainScan,
};
