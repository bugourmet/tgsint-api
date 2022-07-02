import execFile from 'child_process';
const execute = execFile.execFile;

const subdomainScan = async (req, res) => {
  try {
    const { domain } = req.query;
    args = ['sn', '--script', 'hostmap-crtsh', domain];
    if (!domain) {
      return res.json({
        status: 'FAILED',
        data: { error: 'Domain not specified.' },
      });
    } else {
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

export default subdomainScan;
