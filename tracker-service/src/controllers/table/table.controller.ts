import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { tableService, userService } from '../../services';
import ApiError from '../../utils/ApiError';
import pick from '../../utils/pick';

const createTable = catchAsync(async (req, res) => {
  const { userId, headerColumns, name } = req.body;
  const table = await tableService.createTable(userId, headerColumns, name);
  res.status(httpStatus.CREATED).send(table);
});

const queryTables = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tableService.queryTables(user.id, options);
  res.send(result);
});

const deleteTables = catchAsync(async (req, res) => {
  const { tableIds } = req.body
  const result = await tableService.deleteTablesById(tableIds)
  res.send(result);
});

const updateTable = catchAsync(async (req, res) => {
  const { tableId, updateBody } = req.body
  const result = await tableService.updateTableById(tableId, updateBody)
  res.send(result);
});



export default {
  createTable,
  queryTables,
  deleteTables,
  updateTable
};
