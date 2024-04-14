import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Uri from "../Uri";
import { IParameters } from "../Types";
import { JwtPayload, jwtDecode } from "jwt-decode";
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
        try {
            await this.refreshTokenIfExpired(this.config.headers.accessToken);
            const response = await this.axiosInstance.get(url, config ?? this.config);
            console.log(response)
            const { data, status, message, error }: { data: T[], status: number, message: string, error: boolean } = response.data;
            if (error) {
                return ({
                    items: [],
                    status: status,
                    message: message,
                    error: true
                })
            } else {
                return ({
                    items: data,
                    status: status,
                    message: message,
                    error: error
                });
            }
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
            await this.refreshTokenIfExpired(this.config.headers.accessToken);
            const response = await this.axiosInstance.get(url, config ?? this.config);
            console.log(response);
            const { data, status, error, message }: { data: T, status: number, error: any, message: string } = response.data;

            if (error) {
                return ({
                    item: null,
                    status: status,
                    message: message,
                    error: true
                })
            } else {
                return ({
                    item: data,
                    status: status,
                    message: "Success get data",
                    error: false
                })
            }
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
            const noCheckToken = config.headers?.noCheckToken;
            if (!!!noCheckToken) await this.refreshTokenIfExpired(this.config.headers.accessToken);

            const response = await this.axiosInstance.post(url, body, config ?? this.config);
            console.log(response)
            const { data, status, error, message }: { data: T, status: number, error: any, message: string } = response.data;
            if (error) {
                return ({
                    item: null,
                    status: status,
                    message: message,
                    error: true
                })
            } else {
                return ({
                    item: data,
                    status: status,
                    message: message,
                    error: false
                })
            }
        } catch (error: any) {
            console.log(error);
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
            await this.refreshTokenIfExpired(this.config.headers.accessToken);
            const response = await this.axiosInstance.delete(url, config ?? this.config);
            console.log(response)
            const { status, error, message }: { data: T, status: number, error: any, message: string } = response.data;
            if (error) {
                return ({
                    status: error?.response?.status,
                    message: error?.message,
                    error: true
                })
            } else {
                return ({
                    status: status,
                    message: message,
                    error: error,
                })
            }
        } catch (error: any) {
            console.log(error);
            return ({
                status: error?.response?.status,
                message: error?.message,
                error: true
            })
        }

    }

    public async patchItem<T>(url: string, body: IParameters, config?: AxiosRequestConfig): Promise<ISingleResponse<T>> {
        try {
            await this.refreshTokenIfExpired(this.config.headers.accessToken);
            const response = await this.axiosInstance.patch(url, body, config ?? this.config);
            console.log(response);
            const { status, error, message }: { data: T, status: number, error: any, message: string } = response.data;
            if (error) {
                return ({
                    status: error?.response?.status,
                    message: error?.message,
                    error: true

                });
            } else {
                return ({
                    status: status,
                    message: message,
                    error: error
                });
            }
        } catch (error: any) {
            console.log(error);
            return ({
                status: error?.response?.status,
                message: error?.message,
                error: true

            });
        }

    }

    private refreshTokenIfExpired = async (accessToken: string): Promise<string | undefined> => {
        try {
            const decodeToken: JwtPayload = jwtDecode(accessToken);
            const now = new Date();
            if (Math.floor(now.getTime() / (1000)) >= decodeToken.exp) {
                const res = await axios.post(baseURL + Uri.refreshToken, { accessToken: accessToken });
                const { data, error, message, status } = res.data;
                if (error) {
                    console.log(error);
                    localStorage.removeItem("accessToken");
                    window.location.replace('/');
                    return;
                } else {
                    localStorage.setItem("accessToken", data);
                    this.config.headers.accessToken = data;
                    return data;
                }
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem("accessToken");
            window.location.replace('/');
            return;
        }

    }
}



export default AxiosService;