import { Prisma, TableItem } from "@prisma/client";
import prisma from "../../client";
import { QueryOptions } from "../../types/query";
import { queryOptions } from "../../utils/query";
import ApiError from "../../utils/ApiError";
import httpStatus from "http-status";

const queryTableItems = async (filter: object, options: QueryOptions): Promise<TableItem[]> => {
    const { skip, take, orderBy } = queryOptions(options);
    return await prisma.tableItem.findMany({
        where: filter,
        skip,
        take,
        orderBy
    });
};


const addTableItems = async (items: { tableId: number; values: object }[]): Promise<number> => {
    return (await prisma.tableItem.createMany({
        data: items
    })).count
};

const updateTableItemByTableId = async (
    tableItemId: number,
    updateBody: Prisma.TableItemUpdateInput
): Promise<TableItem> => {
    return await prisma.tableItem.update({
        where: { id: tableItemId },
        data: updateBody,
    });
};

const deleteTableItems = async (tableItemIds: number[]): Promise<number[] | null> => {
    const tableItems = await prisma.tableItem.findMany({
        where: { id: { in: tableItemIds } },
        select: { id: true }
    })
    if (!tableItems?.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tables not found');
    }
    const ids = tableItems.map(tableItem => tableItem.id)
    const deleted = (await prisma.tableItem.deleteMany({
        where: {
            id: { in: ids }
        }
    })).count;
    return deleted > 0 ? ids : null
};

export default {
    queryTableItems,
    addTableItems,
    deleteTableItems,
    updateTableItemByTableId
}