import { toQueryString } from "../utils/api";
import { ICreateTable, IDeleteTablesById, IQueryTables, ITable, IUpdateTableById } from 'tracker-config'
import { Methods, doFetch } from "./base";
const tableFetch = (method?: Methods, data?: object,) => doFetch('table', method, data)
function queryTables({ userId, options }: IQueryTables): Promise<ITable[]> {
    return doFetch(`table/${userId}?${toQueryString(options)}`)
}

function createTable(createTable: ICreateTable) {
    return tableFetch('POST', createTable)
}

function updateTable(updateTable: IUpdateTableById) {
    return tableFetch('PATCH', updateTable)
}

function deleteTables(deleteTables: IDeleteTablesById) {
    return tableFetch('DELETE', deleteTables)
}

export {
    queryTables, createTable, updateTable, deleteTables
}

