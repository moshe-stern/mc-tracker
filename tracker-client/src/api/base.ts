const SERVER_URL = 'http://localhost:3000/v1/'
type Methods = 'POST' | 'PUT' | 'DELETE' | 'GET' | 'PATCH'
async function doFetch<T> (url: string, method: Methods = 'GET', data?: object,): Promise<T | null> {
    const options: RequestInit = {
        method,
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(SERVER_URL + url, options)
        if (!response.ok) {
            throw new Error('Failed to Fetch: ' + response.statusText)
        }
        return response.json() as T
    } catch (error) {
        console.error(error)
        return null
    }
}
export {
    doFetch
}
export type { Methods }
