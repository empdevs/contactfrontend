class Uri {
    public static get rootUri(): string { return process.env.REACT_APP_API_ROOT! }
    public static get auth(): string { return process.env.REACT_APP_API_AUTH! }
    public static get getContact(): string { return process.env.REACT_APP_API_GET_CONTACT! }
    public static get insertContact(): string { return process.env.REACT_APP_API_INSERT_CONTACT! }
    public static get deleteContact(): string { return process.env.REACT_APP_API_DELETE_CONTACT! }
};
export default Uri;