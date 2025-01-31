export type IGenericResponse<T> = {
    meta: { page: number; size: number; total: number };
    data: T;
};
