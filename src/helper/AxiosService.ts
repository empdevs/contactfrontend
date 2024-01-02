import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Uri from "../Uri";
import { IParameters } from "../Types";
import { refreshAccessToken } from "./helper";
export const baseURL: string = Uri.rootUri;
interface IMultipleResponse<T> {
    items: T[],
    status: number,
    message: string,
    error?: boolean
}
interface ISingleResponse<T> {
    item?: T | null,
    status: number,
    message: string,
    error?: boolean
}
class AxiosService {

    private axiosInstance: AxiosInstance;
    private config: AxiosRequestConfig;
    constructor() {
        const accessToken: string | null = localStorage.getItem("accessToken");
        this.axiosInstance = axios.create({
            baseURL: baseURL
        });
        this.config = {
            headers: {
                accessToken: accessToken
            }
        }

    }

    public async getItems<T>(url: string, params?: IParameters, config?: AxiosRequestConfig): Promise<IMultipleResponse<T>> {
        let isRepeated: boolean = false;
        do {
            try {
                const response = await this.axiosInstance.get(url, config ?? this.config);
                console.log(response)
                const { data, status, message, error }: { data: T[], status: number, message: string, error: boolean } = response.data;
                /**
                 * Error systematically
                 * If access token expired
                 */
                if (error) {
                    if (message == "TokenExpiredError") {
                        isRepeated = true;
                        const accessToken: string | undefined = await refreshAccessToken(this.config.headers["accessToken"]);
                        this.config.headers.accessToken = accessToken;
                    }
                } else {
                    isRepeated = false;
                    return ({
                        items: data,
                        status: status,
                        message: message,
                        error: error
                    });
                }
            } catch (error: any) {
                isRepeated = false;
                return ({
                    items: [],
                    status: error?.response?.status,
                    message: error?.message,
                    error: true
                })
            }
        } while (isRepeated);
    }

    public async getItem<T>(url: string, params?: IParameters, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        let isRepeated: boolean = false;
        do {
            try {
                const response = await this.axiosInstance.get(url, config ?? this.config);
                console.log(response);
                const { data, status, error, message }: { data: T, status: number, error: any, message: string } = response.data;
                /**
               * Error systematically
               * If access token expired
               */
                if (error) {
                    if (message == "TokenExpiredError") {
                        isRepeated = true;
                        const accessToken: string | undefined = await refreshAccessToken(this.config.headers["accessToken"]);
                        this.config.headers.accessToken = accessToken;
                    }
                } else {
                    isRepeated = false;
                    return ({
                        item: data,
                        status: status,
                        message: "Success get data"
                    })
                }
            } catch (error: any) {
                isRepeated = false;
                return ({
                    item: null,
                    status: error?.response?.status,
                    message: error?.message,
                    error: true
                })
            }
        } while (isRepeated);
    }

    public async post<T>(url: string, body: IParameters, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        let isRepeated: boolean = false;
        do {
            try {
                const response = await this.axiosInstance.post(url, body, config ?? this.config);
                console.log(response)
                const { data, status, error, message }: { data: T, status: number, error: any, message: string } = response.data;
                if (error) {
                    if (message == "TokenExpiredError") {
                        isRepeated = true;
                        const accessToken: string | undefined = await refreshAccessToken(this.config.headers["accessToken"]);
                        this.config.headers.accessToken = accessToken;
                    }
                } else {
                    isRepeated = false;
                    return ({
                        item: data,
                        status: status,
                        message: message
                    })
                }
            } catch (error: any) {
                isRepeated = false;
                return ({
                    item: null,
                    status: error?.response?.status,
                    message: error?.message,
                    error: true
                })
            }
        } while (isRepeated);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        let isRepeated: boolean = false;
        do {
            try {
                const response = await this.axiosInstance.delete(url, config ?? this.config);
                console.log(response)
                const { data, status, error, message }: { data: T, status: number, error: any, message: string } = response.data;
                if (error) {
                    if (message == "TokenExpiredError") {
                        isRepeated = true;
                        const accessToken: string | undefined = await refreshAccessToken(this.config.headers["accessToken"]);
                        this.config.headers.accessToken = accessToken;
                    }
                } else {
                    isRepeated = false;
                    return ({
                        status: status,
                        message: message,
                        error: error,
                    })
                }
            } catch (error: any) {
                isRepeated = false;
                return ({
                    status: error?.response?.status,
                    message: error?.message,
                    error: true
                })
            }
        } while (isRepeated);
    }

    public async patchItem<T>(url: string, body: IParameters, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        let isRepeated = false;
        do {
            try {
                const response = await this.axiosInstance.patch(url, body, config ?? this.config);
                console.log(response);
                const { data, status, error, message }: { data: T, status: number, error: any, message: string } = response.data;
                if (error) {
                    if (message == "TokenExpiredError") {
                        isRepeated = true;
                        const accessToken: string | undefined = await refreshAccessToken(this.config.headers["accessToken"]);
                        this.config.headers.accessToken = accessToken;
                    }
                } else {
                    isRepeated = false;
                    return ({
                        status: status,
                        message: message,
                        error: error
                    });
                }
            } catch (error: any) {
                isRepeated = false;
                return ({
                    status: error?.response?.status,
                    message: error?.message,
                    error: true

                });
            }
        } while (isRepeated);
    }
}


export default AxiosService;