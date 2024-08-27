import { useUserStore } from "@/store/user";

const SERVER_URL = 'http://localhost:3000/v1/'
type Methods = 'POST' | 'PUT' | 'DELETE' | 'GET' | 'PATCH'
async function doFetch<T>(url: string, method: Methods = 'GET', data?: object,): Promise<{
    result: T | Error;
    isError: boolean;
}> {
    const token = useUserStore.getState().tokens?.access.token;
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(SERVER_URL + url, options)
    return { result: await response.json() as T | Error, isError: !response.ok }
}
export {
    doFetch
}
export type { Methods }
