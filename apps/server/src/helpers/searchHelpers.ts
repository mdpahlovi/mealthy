export function searchHelper(search: string, fields: string[]) {
    return {
        OR: fields.map((field) => ({
            [field]: {
                contains: search,
                mode: "insensitive",
            },
        })),
    };
}
