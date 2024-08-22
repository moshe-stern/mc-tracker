import express from 'express';
import auth from '../../../middlewares/auth';
import validate from '../../../middlewares/validate';
import { tableController } from '../../../controllers';
import { tableValidation } from '../../../validations';

const router = express.Router();

router
  .route('/:userId')
  .get(auth('getTables'), validate(tableValidation.queryTables), tableController.queryTables);

router
  .route('/')
  .post(auth('manageTables'), validate(tableValidation.createTable), tableController.createTable)
  .patch(auth('manageTables'), validate(tableValidation.updateTable), tableController.updateTable)
  .delete(
    auth('manageTables'),
    validate(tableValidation.deleteTables),
    tableController.deleteTables
  );

export default router;
