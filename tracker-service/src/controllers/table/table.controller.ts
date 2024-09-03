import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { tableService, userService } from '../../services';
import ApiError from '../../utils/ApiError';
import pick from '../../utils/pick';
import { ICreateTable, IDeleteTables, IUpdateTable } from 'tracker-config';
import { Prisma } from '@prisma/client';

const createTable = catchAsync(async (req, res) => {
  const { headerColumns, name }: ICreateTable = req.body;
  const table = await tableService.createTable(req.params.userId, headerColumns, name);
  res.status(httpStatus.CREATED).send(table);
});

const queryTables = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await tableService.queryTables(user.id, pick(req.query, ['sortBy', 'limit', 'page']));
  res.send(result);
});

const deleteTables = catchAsync(async (req, res) => {
  const { tableIds }: IDeleteTables = req.body;
  const result = await tableService.deleteTablesById(tableIds);
  res.send(result);
});

const updateTable = catchAsync(async (req, res) => {
  const { tableId, updateBody }: IUpdateTable = req.body;
  const result = await tableService.updateTableById(tableId, updateBody as Prisma.TableUpdateInput);
  res.send(result);
});

export default {
  createTable,
  queryTables,
  deleteTables,
  updateTable
};
