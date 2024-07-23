import { IAddTableItems, IDeleteTableItems, IQueryTableItems, IUpdateTableItemByTableId } from "tracker-config";
import { doFetch, Methods } from "./base";
import { toQueryString } from "../utils/api";
const tableItemFetch = (method: Methods, data: object) => doFetch('table-item', method, data)

function queryTableItems({ tableId, options }: IQueryTableItems) {
    doFetch(`table-item/${tableId}?${toQueryString(options)}`)
}

function addTableItems({ items }: IAddTableItems) {
    tableItemFetch('POST', items)
}

function updateTableItemByTableId({ tableItemId, updateBody }: IUpdateTableItemByTableId) {
    tableItemFetch('PATCH', { tableItemId, updateBody })
}

function deleteTableItems({ tableItemIds }: IDeleteTableItems) {
    tableItemFetch('DELETE', tableItemIds)
}

export {
    queryTableItems,
    deleteTableItems,
    updateTableItemByTableId,
    addTableItems
}