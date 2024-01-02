export interface IContacts {
    id: string,
    name: string,
    phone: number
}

export interface IParameters {
    username?: string,
    password?: string,
    name?: string,
    phone?: number,
    userId?: string,
    accessToken?: string
}

export interface IUser {
    id: string,
    username: string,
    accessToken?: string
}