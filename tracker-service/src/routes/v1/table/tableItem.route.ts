import express from 'express';
import auth from '../../../middlewares/auth';
import validate from '../../../middlewares/validate';
import { tableItemController } from '../../../controllers';
import tableItemValidation from '../../../validations/table/tableItem.validation';

const router = express.Router();

router
  .route('/:tableId')
  .get(
    auth('getTableItems'),
    validate(tableItemValidation.queryTableItems),
    tableItemController.queryTableItems
  )
router.route('/')
  .post(
    auth('manageTableItems'),
    validate(tableItemValidation.createTableItems),
    tableItemController.addTableItems
  )
  .patch(
    auth('manageTableItems'),
    validate(tableItemValidation.updateTableItem),
    tableItemController.updateTableItemByTableId
  )
  .delete(
    auth('manageTableItems'),
    validate(tableItemValidation.deleteTableItems),
    tableItemController.deleteTableItems
  );

export default router;
