import { QueryOptions } from "../query";
import { ITable } from "../table";

interface IQueryTables {
    userId: number, options: QueryOptions
}

interface ICreateTable {
    userId: number,
    headerColumns: string[],
    name: string
}

interface IUpdateTable {
    tableId: number,
    updateBody: Partial<ITable>
}

interface IDeleteTables {
    tableIds: number[]
}

export {
    IQueryTables,
    ICreateTable,
    IUpdateTable,
    IDeleteTables
}