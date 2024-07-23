const SERVER_URL = 'http://localhost:8080/v1/'
type Methods = 'POST' | 'PUT' | 'DELETE' | 'GET'| 'PATCH'
async function doFetch<T>(url: string, method: Methods = 'GET', data?: object,): Promise<T> {
    const options: RequestInit = {
        method,
        body: JSON.stringify(data)
    }
    const response = await fetch(SERVER_URL + url, options)
    if (!response.ok) throw new Error(response.statusText)
    return response.json() as T
}
export {
    doFetch
}
export type { Methods }
