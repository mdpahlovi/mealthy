import { useEffect } from "react";
import { baseAxios } from "@/utilities/axios";
import { useAppSelector } from "@/redux/hooks";

export function useAxiosRequest() {
    const { token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const requestIntercept = baseAxios.interceptors.request.use((config) => {
            if (!config.headers["authorization"]) config.headers["authorization"] = token;
            return config;
        });

        return () => baseAxios.interceptors.request.eject(requestIntercept);
    }, [token]);

    return baseAxios;
}
