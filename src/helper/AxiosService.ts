import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Uri from "../Uri";

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
interface IParameters {
    username?: string,
    password?: any,
    name?: string,
    phone?: number
}
class AxiosService {

    private axiosInstance: AxiosInstance;
    private config: AxiosRequestConfig;
    constructor() {
        const baseURL: string = Uri.rootUri;
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
        try {
            const response = await this.axiosInstance.get(url, config ?? this.config);
            console.log(response)
            const items: T[] = response.data.data;
            return ({
                items: items,
                status: response.data.status,
                message: response.data.message,
                error: response.data.error
            })
        } catch (error: any) {
            return ({
                items: [],
                status: error?.response?.status,
                message: error?.message,
                error: true
            })
        }
    }

    public async getItem<T>(url: string, params?: IParameters, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        try {
            const response = await this.axiosInstance.get(url, config ?? this.config);
            const item: T = response.data;
            return ({
                item: item,
                status: response.status,
                message: "Success get data"
            })
        } catch (error: any) {
            return ({
                item: null,
                status: error?.response?.status,
                message: error?.message,
                error: true
            })
        }
    }

    public async post<T>(url: string, body: IParameters, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        try {
            const response = await this.axiosInstance.post(url, body, config ?? this.config);
            console.log(response)
            const item = response.data;
            return ({
                item: item.data,
                status: item.status,
                message: item.message
            })
        } catch (error: any) {
            return ({
                item: null,
                status: error?.response?.status,
                message: error?.message,
                error: true
            })
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        try {
            const response = await this.axiosInstance.delete(url, config ?? this.config);
            console.log(response)
            const item = response.data;
            return ({
                status: item.status,
                message: item.message,
                error: item.error,
            })
        } catch (error: any) {
            return ({
                status: error?.response?.status,
                message: error?.message,
                error: true
            })
        }
    }
}


export default AxiosService;