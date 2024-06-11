import { User } from "./user"

interface Table {
    id: number
    user: User
    userId: number
    headerColumns: string[]
    tableItems: TableItem[]
    name: string
}

interface TableItem {
    id: number
    table: Table
    tableId: number
    values: object
}

export type {
    Table,
    TableItem
}