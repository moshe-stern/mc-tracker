import { IAuthTokensResponse, IUser } from "tracker-config"
import { doFetch } from "./base"

function login(email: string, password: string) {
    return doFetch<{ user: Omit<IUser, 'password'>, tokens: IAuthTokensResponse }>('auth/login', 'POST', { email, password })
}

function register(email: string, password: string, name: string) {
    return doFetch<{
        user: Omit<IUser, "password" | "createdAt" | "updatedAt">,
        tokens: IAuthTokensResponse
    }>('auth/register', 'POST',
        {
            email, password, name
        }
    )
}

export {
    login,
    register
}
