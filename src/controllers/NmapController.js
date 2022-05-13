const execFile = require('child_process').execFile;
const command = `nmap`;

const pingScan = (req, res) => {
  try {
    args = ["-sn",req.query.target];
    execFile(command, args, (err, output) => {
      if (err) {
        res.send({ status: "FAILED", data: { error: error?.message || error } });
      }
        res.status(201).send({ status: "OK", data: output });
    });

  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


const quickTraceroute = (req, res) => {
  try {
    args = ["-sn","--traceroute",req.query.target];
    execFile(command, args, (err, output) => {
      if (err) {
        res.send({ status: "FAILED", data: { error: error?.message || error } });
      }
        res.status(201).send({ status: "OK", data: output });
    });

  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


const intenseScan = (req, res) => {
  try {
    args = ["-T4","-A","-v",req.query.target];
    execFile(command, args, (err, output) => {
      if (err) {
        res.send({ status: "FAILED", data: { error: error?.message || error } });
      }
        res.status(201).send({ status: "OK", data: output });
    });

  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


const intenseScanUDP = (req, res) => {
  try {
    args = ["-sS","-sU","-T4","-A","-v",req.query.target];
    execFile(command, args, (err, output) => {
      if (err) {
        res.send({ status: "FAILED", data: { error: error?.message || error } });
      }
        res.status(201).send({ status: "OK", data: output });
    });

  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


const intenseScanTCP = (req, res) => {
  try {
    args = ["p","1-65535","-T4","-A","-v",req.query.target];
    execFile(command, args, (err, output) => {
      if (err) {
        res.send({ status: "FAILED", data: { error: error?.message || error } });
      }
      res.status(201).send({ status: "OK", data: output });
    });

  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


const QuickScanPlus = (req, res) => {
  try {
    args = ["-sV","-T4","-O","-F","--version-light",req.query.target];
    execFile(command, args, (err, output) => {
      if (err) {
        res.send({ status: "FAILED", data: { error: error?.message || error } });
      }
        res.status(201).send({ status: "OK", data: output });
    });

  } catch (error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


module.exports = {
  pingScan,
  quickTraceroute,
  intenseScan,
  intenseScanTCP,
  intenseScanUDP,
  QuickScanPlus,
};
