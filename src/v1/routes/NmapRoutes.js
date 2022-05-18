const express = require('express');
const NmapController = require('../../controllers/NmapController');
const router = express.Router();

router.get('/ping/', NmapController.pingScan);
router.get('/traceroute/', NmapController.quickTraceroute);
router.get('/intscan/', NmapController.intenseScan);
router.get('/intscantcp/', NmapController.intenseScanTCP);
router.get('/intscanudp/', NmapController.intenseScanUDP);
router.get('/quickscan/', NmapController.quickScanPlus);
router.get('/subdomains/', NmapController.subdomainScan);

module.exports = router;
