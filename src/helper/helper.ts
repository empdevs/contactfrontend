import axios from "axios";
import { IParameters } from "../Types";
import Uri from "../Uri";
import { baseURL } from "./AxiosService";


/**
 * Encoded query string params
 * 
 * @param queryParams 
 * @returns 
 */
export const encodeQueryParams = (queryParams: IParameters): string => {
    const encodedParams = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
        .join("&");

    return encodedParams;
};


export const refreshAccessToken = async (accessToken: string): Promise<string | undefined> => {
    try {
        const res = await axios.post(baseURL + Uri.refreshToken, { accessToken: accessToken });
        const { data, error, message, status } = res.data;
        console.log(res);
        if (error) {
            localStorage.removeItem("accessToken");
            window.location.replace('/');
            return undefined;
        } else {
            localStorage.setItem("accessToken", data);
            return data;
        }
    } catch (error) {
        localStorage.removeItem("accessToken");
        window.location.replace('/');
        return undefined;
    }
}