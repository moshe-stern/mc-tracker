import { IQueryOptions } from "tracker-config";

function toQueryString(queryOptions: IQueryOptions): string {
    return Object.keys(queryOptions).map(key => {
        const queryValue = queryOptions[key as keyof IQueryOptions]
        if (!queryValue) return
        const query = JSON.stringify(queryValue)
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(query)
    }).join('&')
}

export {
    toQueryString
}