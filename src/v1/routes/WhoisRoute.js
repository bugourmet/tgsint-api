const express = require('express');
const WhoisController = require('../../controllers/WhoisController');
const router = express.Router();

router.get('/', WhoisController.whoisQuery);

module.exports = router;
