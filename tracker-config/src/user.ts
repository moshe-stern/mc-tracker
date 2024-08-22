import { IToken } from "./auth"
import { ITable } from "./table"

interface IUser {
    id: number
    email: string
    name?: string
    password: string
    role: ERole
    isEmailVerified: boolean
    createdAt: Date
    updatedAt: Date
    tokens: IToken[]
    tables: ITable[]
}

enum ERole {
    USER,
    ADMIN
}

export type {
    ERole,
    IUser
}