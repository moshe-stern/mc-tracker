import { IQueryOptions } from "../query";
import { ITable } from "../table";

interface IQueryTables {
    options: IQueryOptions
}

interface ICreateTable {
    headerColumns: string[]
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