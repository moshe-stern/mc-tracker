import httpStatus from 'http-status';
import { tableService, tableItemService } from '../../services';
import ApiError from '../../utils/ApiError';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import { Prisma } from '@prisma/client';
import { IAddTableItems, IDeleteTableItems, IUpdateTableItemByTableId } from 'tracker-config';

const queryTableItems = catchAsync(async (req, res) => {
  const table = await tableService.getTableById(req.params.tableId);
  if (!table) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Table not found');
  }
  const filter = pick(req.query, table.headerColumns);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const tableItems = await tableItemService.queryTableItems(
    { ...filter, tableId: table.id } as Prisma.TableItemWhereInput,
    options
  );
  res.send(tableItems);
});

const addTableItems = catchAsync(async (req, res) => {
  const { items }: IAddTableItems = req.body
  const count = await tableItemService.addTableItems(items);
  res.status(httpStatus.CREATED).send(count);
});

const updateTableItemByTableId = catchAsync(async (req, res) => {
  const { tableItemId, updateBody }: IUpdateTableItemByTableId = req.body;
  const tableItem = await tableItemService.updateTableItemByTableId(tableItemId, updateBody as Prisma.TableItemUpdateInput);
  res.send(tableItem);
});

const deleteTableItems = catchAsync(async (req, res) => {
  const { tableItemIds }: IDeleteTableItems = req.body;
  const ids = await tableItemService.deleteTableItems(tableItemIds);
  res.send(ids);
});

export default {
  queryTableItems,
  addTableItems,
  updateTableItemByTableId,
  deleteTableItems
};
