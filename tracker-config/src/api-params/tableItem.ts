import { QueryOptions } from "../query";
import { ITableItem } from "../table";
interface IQueryTableItems {
    tableId: number
    options: QueryOptions
}

interface IAddTableItems {
    items: {
        tableId: number;
        values: object;
    }[]
}

interface IUpdateTableItemByTableId {
    tableItemId: number,
    updateBody: Partial<ITableItem>
}

interface IDeleteTableItems {
    tableItemIds: number[]
}

export {
    IAddTableItems,
    IQueryTableItems,
    IUpdateTableItemByTableId,
    IDeleteTableItems
}




