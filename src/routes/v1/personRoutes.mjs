import express from 'express';
import personController from '../../controllers/person/index.mjs';
import SchemaValidator from '../../middleware/schemaValidator.mjs';
import schemas from '../../middleware/schemas/index.mjs';
const router = express.Router();

router.get(
  '/phone/',
  SchemaValidator(schemas.personSchema.getByPhone),
  personController.findByPhone
);
router.get(
  '/find/',
  SchemaValidator(schemas.personSchema.getByName),
  personController.findByName
);

//Add a person to the DB
// router.post(
//   '/add/',
//   SchemaValidator(schemas.personSchema.addOrUpdate),
//   personController.addPerson
// );

//Delete a person from the DB
// router.delete(
//   '/delete/',
//   SchemaValidator(schemas.personSchema.deletePerson),
//   personController.deletePerson
// );

//Update a person from the DB
// router.patch(
//   '/update/',
//   SchemaValidator(schemas.personSchema.addOrUpdate),
//   personController.updatePerson
// );

export default router;
