import prisma from '../client';
import { Table } from '@prisma/client';
const createTable = async (userId: number, headerColumns: string[]): Promise<Table> => {
  return prisma.table.create({
    data: {
      userId,
      headerColumns
    }
  });
};

const addTableItems = async (items: { tableId: number; values: object }[]): Promise<number> => {
  const response = await prisma.tableItem.createMany({
    data: items
  });
  return response.count;
};

export default {
  createTable,
  addTableItems
};
