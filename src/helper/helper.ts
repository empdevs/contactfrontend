import axios from "axios";
import { IParameters } from "../Types";
import Uri from "../Uri";
import { baseURL } from "./AxiosService";
import { JwtPayload, jwtDecode } from "jwt-decode";


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