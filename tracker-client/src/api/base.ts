const SERVER_URL = 'http://localhost:8080/v1/'
type Methods = 'POST' | 'PUT' | 'DELETE' | 'GET'| 'PATCH'
async function doFetch(url: string, method: Methods = 'GET', data?: object,) {
    const options: RequestInit = {
        method,
        body: JSON.stringify(data)
    }
    const response = await fetch(SERVER_URL + url, options)
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}
export {
    doFetch
}
export type { Methods }
