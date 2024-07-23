import { IUser } from "./user"

interface IToken {
    id: number
    token: string
    type: ETokenType
    expires: Date
    blacklisted: boolean
    createdAt: Date
    user: IUser
    userId: number
}

enum ETokenType {
    ACCESS,
    REFRESH,
    RESET_PASSWORD,
    VERIFY_EMAIL
}

export type {
    IToken,
    ETokenType
}

