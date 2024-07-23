import { IUser } from "./user"

interface ITable {
    id: number
    user: IUser
    userId: number
    headerColumns: string[]
    tableItems: ITableItem[]
    name: string
}

interface ITableItem {
    id: number
    table: ITable
    tableId: number
    values: object
}

export type {
    ITable,
    ITableItem
}