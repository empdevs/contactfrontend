class Uri {
    public static get rootUri(): string { return process.env.REACT_APP_API_ROOT! }
    public static get auth(): string { return process.env.REACT_APP_API_AUTH! }
    public static get getContact(): string { return process.env.REACT_APP_API_GET_CONTACT! }
    public static get insertContact(): string { return process.env.REACT_APP_API_INSERT_CONTACT! }
    public static get deleteContact(): string { return process.env.REACT_APP_API_DELETE_CONTACT! }
    public static get patchContact(): string { return process.env.REACT_APP_API_PATCH_CONTACT! }
    public static get refreshToken(): string { return process.env.REACT_APP_API_REFRESH_TOKEN! }
    public static get googleClientId(): string { return process.env.REACT_APP_API_CLIENT_ID! }
    public static get googleClientSecret(): string { return process.env.REACT_APP_API_CLIENT_SECRET! }
};
export default Uri;