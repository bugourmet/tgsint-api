const express = require('express');
const PersonController = require('../../controllers/PersonController');
const router = express.Router();

//Find a person by phone number
router.get('/phone/', PersonController.findByPhone);

//Find a person by name and surname
router.get('/find/', PersonController.findByName);

//Add a person to the DB
router.post('/add/', PersonController.addPerson);

//Delete a person from the DB
router.delete('/delete/', PersonController.deletePerson);

//Update a person from the DB
router.patch('/update/', PersonController.updatePerson);

module.exports = router;
