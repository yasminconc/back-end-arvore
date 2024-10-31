
export type CreateUserBody = {
    id: string,
    name: string,
    email: string,
    password: string,
    birthDate: string
}

export type AuthBody = {
    email: string,
    password: string
}