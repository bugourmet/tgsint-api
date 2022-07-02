import express from 'express';
import personController from '../../controllers/person/index.mjs';
const router = express.Router();

router.get('/phone/', personController.findByPhone);
router.get('/find/', personController.findByName);

//Add a person to the DB
// router.post('/add/', personController.addPerson);

//Delete a person from the DB
// router.delete('/delete/', personController.deletePerson);

//Update a person from the DB
// router.patch('/update/', personController.updatePerson);

export default router;
