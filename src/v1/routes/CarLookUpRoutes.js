const express = require('express');
const CarLookupController = require('../../controllers/CarLookUpController');

const router = express.Router();

//Look up croatian license plates
router.get('/hr/', CarLookupController.hrLookUp);

//Look up bosnian license plates
router.get('/bih/', CarLookupController.bihLookUp);

//Look up croatian technical inspection results by vin
router.get('/vin/', CarLookupController.vinLookUp);

module.exports = router;
