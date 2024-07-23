import { QueryOptions } from "tracker-config";

function toQueryString(queryOptions: QueryOptions): string {
    return Object.keys(queryOptions).map(key => {
        const queryValue = queryOptions[key as keyof QueryOptions]
        if (!queryValue) return
        const query = JSON.stringify(queryValue)
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(query)
    }).join('&')
}

export {
    toQueryString
}