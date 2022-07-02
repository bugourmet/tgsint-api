import express from 'express';
import nmapController from '../../controllers/nmap/index.mjs';
const router = express.Router();

router.get('/ping/', nmapController.pingScan);
router.get('/traceroute/', nmapController.quickTraceroute);
router.get('/intscan/', nmapController.intenseScan);
router.get('/intscantcp/', nmapController.intenseTCP);
router.get('/intscanudp/', nmapController.intenseUDP);
router.get('/quickscan/', nmapController.quickScan);
router.get('/subdomains/', nmapController.subdomainScan);

export default router;
