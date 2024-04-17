class Uri {
    public static get rootUri(): string { return import.meta.env["VITE_APP_API_ROOT"] }
    public static get auth(): string { return import.meta.env["VITE_APP_API_AUTH"] }
    public static get getContact(): string { return import.meta.env["VITE_APP_API_GET_CONTACT"] }
    public static get insertContact(): string { return import.meta.env["VITE_APP_API_INSERT_CONTACT"] }
    public static get deleteContact(): string { return import.meta.env["VITE_APP_API_DELETE_CONTACT"] }
    public static get patchContact(): string { return import.meta.env["VITE_APP_API_PATCH_CONTACT"] }
    public static get refreshToken(): string { return import.meta.env["VITE_APP_API_REFRESH_TOKEN"] }
};
export default Uri;