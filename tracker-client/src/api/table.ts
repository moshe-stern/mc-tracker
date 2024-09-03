import { toQueryString } from "../utils/api";
import { ICreateTable, IDeleteTables, IQueryTables, ITable, IUpdateTable } from 'tracker-config'
import { Methods, doFetch } from "./base";
import { useUserStore } from "@/store/user";

const tableFetch = <T>(method?: Methods, data?: object) => doFetch<T>(`table/${useUserStore.getState().user?.id}`, method, data)

function queryTables({ options }: IQueryTables) {
    return doFetch<ITable[]>(`table/${useUserStore.getState().user?.id}?${toQueryString(options)}`)
}

function createTable(createTable: ICreateTable) {
    return tableFetch<ITable>('POST', createTable)
}

function updateTable(updateTable: IUpdateTable) {
    return tableFetch<ITable>('PATCH', updateTable)
}

function deleteTables(deleteTables: IDeleteTables) {
    return tableFetch<number[]>('DELETE', deleteTables)
}

export {
    queryTables, createTable, updateTable, deleteTables
}

