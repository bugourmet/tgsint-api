import express from 'express';
import nmapController from '../../controllers/nmap/index.mjs';
import SchemaValidator from '../../middleware/schemaValidator.mjs';
import schemas from '../../middleware/schemas/index.mjs';
const router = express.Router();

router.get(
  '/ping/',
  SchemaValidator(schemas.nmapSchema.scanTarget),
  nmapController.pingScan
);
router.get(
  '/traceroute/',
  SchemaValidator(schemas.nmapSchema.scanTarget),
  nmapController.quickTraceroute
);
router.get(
  '/intscan/',
  SchemaValidator(schemas.nmapSchema.scanTarget),
  nmapController.intenseScan
);
router.get(
  '/intscantcp/',
  SchemaValidator(schemas.nmapSchema.scanTarget),
  nmapController.intenseTCP
);
router.get(
  '/intscanudp/',
  SchemaValidator(schemas.nmapSchema.scanTarget),
  nmapController.intenseUDP
);
router.get(
  '/quickscan/',
  SchemaValidator(schemas.nmapSchema.scanTarget),
  nmapController.quickScan
);
router.get(
  '/subdomains/',
  SchemaValidator(schemas.nmapSchema.scanTarget),
  nmapController.subdomainScan
);

export default router;
