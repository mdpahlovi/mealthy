import axios from "axios";
import type { GenericErrorResponse } from "@/types";

export const BASE_URL = "http://localhost:5000/api/v1";
export const baseAxios = axios.create({ baseURL: BASE_URL, timeout: 60000 });

baseAxios.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (err) {
        const error: GenericErrorResponse = {
            statusCode: err?.response?.status || 500,
            message: err?.response?.data?.message || err?.message || "Something went wrong...",
            errorMessages: err?.response?.data?.errorMessages || [],
        };

        return Promise.reject(error);
    }
);
