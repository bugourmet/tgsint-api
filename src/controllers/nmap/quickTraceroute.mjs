import execFile from 'child_process';
const execute = execFile.execFile;

const quickTraceroute = async (req, res) => {
  try {
    const { target } = req.query;
    if (!target) {
      return res.json({
        status: 'FAILED',
        data: { error: 'Target not specified.' },
      });
    } else {
      args = ['-sn', '--traceroute', target];
      execute(command, args, (error, output) => {
        if (error) {
          return res.json({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
        return res.status(201).json({ status: 'OK', data: output });
      });
    }
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default quickTraceroute;
