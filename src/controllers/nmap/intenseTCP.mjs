import execFile from 'child_process';
const execute = execFile.execFile;
import constants from '../../utils/const.mjs';
const command = `nmap`;

const intenseUDP = (req, res) => {
  try {
    const { target } = req.query;
    const args = ['p', '1-65535', '-T4', '-A', '-v', target];
    execute(command, args, (error, output) => {
      if (error) {
        throw new Error(constants.errors.SCAN_ERROR);
      }
      return res.status(201).send({ status: 'OK', data: output });
    });
  } catch (error) {
    switch (error.message) {
      case constants.errors.SCAN_ERROR: {
        res
          .status(400)
          .json({ data: 'Something went wrong while scanning the target.' });
        break;
      }
      default: {
        res.status(400).json({ data: 'Something went wrong.' });
        console.log(error);
        break;
      }
    }
  }
};

export default intenseUDP;
