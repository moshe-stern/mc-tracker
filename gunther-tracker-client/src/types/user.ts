import { Token } from "./auth"
import { Table } from "./table"

interface User {
    id: number
    email: string
    name?: string
    password: string
    role: Role
    isEmailVerified: boolean
    createdAt: Date
    updatedAt: Date
    tokens: Token[]
    tables: Table[]
}

enum Role {
    USER,
    ADMIN
}

export type {
    Role,
    User
}