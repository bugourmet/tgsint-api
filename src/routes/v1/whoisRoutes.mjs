import express from 'express';
import whoisController from '../../controllers/whois/index.mjs';
const router = express.Router();

router.get('/', whoisController.whoisQuery);

export default router;
