import express from 'express';
import carLookUpController from '../../controllers/car/index.mjs';
const router = express.Router();

//Look up croatian license plates
router.get('/hr/', carLookUpController.hrLookup);
//Look up bosnian license plates
router.get('/bih/', carLookUpController.bihLookup);
//Look up croatian technical inspection results by vin
router.get('/vin/', carLookUpController.vinLookup);

export default router;
