import { IAddTableItems, IDeleteTableItems, IQueryTableItems, ITableItem, IUpdateTableItemByTableId } from "tracker-config";
import { doFetch, Methods } from "./base";
import { toQueryString } from "../utils/api";
const tableItemFetch = <T>(method: Methods, data: object) => doFetch<T>('table-item', method, data)

function queryTableItems({ tableId, options }: IQueryTableItems) {
    return doFetch<ITableItem[]>(`table-item/${tableId}?${toQueryString(options)}`)
}

function addTableItems({ items }: IAddTableItems) {
    return tableItemFetch<number>('POST', items)
}

function updateTableItemByTableId({ tableItemId, updateBody }: IUpdateTableItemByTableId) {
    return tableItemFetch<ITableItem>('PATCH', { tableItemId, updateBody })
}

function deleteTableItems({ tableItemIds }: IDeleteTableItems) {
    tableItemFetch<number[]>('DELETE', tableItemIds)
}

export {
    queryTableItems,
    deleteTableItems,
    updateTableItemByTableId,
    addTableItems
}