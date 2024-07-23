import { User } from "./user"

interface Token {
    id: number
    token: string
    type: TokenType
    expires: Date
    blacklisted: boolean
    createdAt: Date
    user: User
    userId: number
}

enum TokenType {
    ACCESS,
    REFRESH,
    RESET_PASSWORD,
    VERIFY_EMAIL
}

export type {
    Token,
    TokenType
}

