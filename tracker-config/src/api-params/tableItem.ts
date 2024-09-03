import { IQueryOptions } from "../query";
import { ITableItem } from "../table";
interface IQueryTableItems {
    tableId: number
    options: IQueryOptions
}

interface IAddTableItems {
    items: {
        tableId: number;
        values: string[];
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




