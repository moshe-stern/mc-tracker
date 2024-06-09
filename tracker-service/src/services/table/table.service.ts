import prisma from '../../client';
import { Prisma, Table } from '@prisma/client';
import { queryOptions } from '../../utils/query';
import { QueryOptions } from '../../types/query';
import ApiError from '../../utils/ApiError';
import httpStatus from 'http-status';

const queryTables = async (userId: number, options: QueryOptions): Promise<Table[]> => {
  const { skip, take, orderBy } = queryOptions(options);
  const tables = await prisma.table.findMany({
    where: { userId: userId },
    skip,
    take,
    orderBy
  });
  return tables;
};
const createTable = async (userId: number, headerColumns: string[], name: string): Promise<Table> => {
  return prisma.table.create({
    data: {
      userId,
      headerColumns,
      name
    }
  });
};


const getTableById = async (id: number): Promise<Table | null> => {
  return prisma.table.findUnique({
    where: { id }
  });
};

const updateTableById = async (
  tableId: number,
  updateBody: Prisma.TableUpdateInput
): Promise<Table | null> => {
  const table = await getTableById(tableId);
  if (!table) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Table not found');
  }
  const updatedTable = await prisma.table.update({
    where: { id: table.id },
    data: updateBody,
  });
  return updatedTable
};
const deleteTablesById = async (tableIds: number[]): Promise<number[] | null> => {
  const tables = await prisma.table.findMany({
    where: { id: { in: tableIds } },
    select: { id: true }
  })
  if (!tables?.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tables not found');
  }
  const ids = tables.map(table =>  table.id)
  const deleted = (await prisma.table.deleteMany({ where: { id: { in: ids } } })).count;
  return deleted > 0 ?  ids : null
};



export default {
  createTable,
  queryTables,
  getTableById,
  deleteTablesById,
  updateTableById
};
