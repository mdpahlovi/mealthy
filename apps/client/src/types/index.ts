import { AxiosInstance } from "axios";
import { QueryClient } from "react-query";

type GenericErrorMessage = { path: string | number; message: string };
export type GenericErrorResponse = { statusCode: number; message: string; errorMessages: GenericErrorMessage[] };

export type IApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: { page: number; size: number; total: number };
    data?: T | null;
};

export type Column<T> = { header: string; cell: (data: T, axios: AxiosInstance, queryClient: QueryClient) => React.ReactNode }[];
