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
    accessToken?: string,
    client_id?: string,
    client_secret?: string,
    code?: string,
    grant_type?: "authorization_code",
    redirect_uri?: string,
    access_type?: "offline"
}

export interface IUser {
    id: string,
    username: string,
    accessToken?: string
}