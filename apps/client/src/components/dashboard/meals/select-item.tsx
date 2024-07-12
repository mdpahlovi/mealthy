import { Done } from "@mui/icons-material";
import type { Item } from "@prisma/client";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import type { Error, Value } from "@/pages/dashboard/create-meal";

type SelectItemProps = {
    error: Error;
    value: Value;
    mealItems: Item[];
    setValue: React.Dispatch<React.SetStateAction<Value>>;
};

export default function SelectItem({ error, value, mealItems, setValue }: SelectItemProps) {
    const handleSelect = (itemId: string) => {
        setValue({
            ...value,
            items: value?.items?.includes(itemId) ? value?.items?.filter((item) => item !== itemId) : [...value?.items, itemId],
        });
    };

    const optionContainerStyle =
        (isSelected: boolean): SxProps<Theme> =>
        ({ palette: { primary, background, divider } }) => ({
            cursor: "pointer",
            border: "1px solid",
            borderColor: isSelected ? primary.main : divider,
            backgroundColor: isSelected ? "#F0F8F8" : background.default,
            px: 2,
            pt: 0.5,
            pb: 1.5,
            borderRadius: 1.5,
            maxWidth: "max-content",
        });

    const optionTickStyle =
        (isSelected: boolean): SxProps<Theme> =>
        ({ palette: { primary, background, divider } }) => ({
            width: 18,
            height: 18,
            border: "1px solid",
            borderRadius: 9999,
            borderColor: isSelected ? primary.main : divider,
            backgroundColor: isSelected ? primary.main : background.default,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: background.default,
        });

    return (
        <Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {mealItems?.map(({ id, name: itemName, category }) => (
                    <Box key={id} sx={optionContainerStyle(value?.items?.includes(id))} onClick={() => handleSelect(id)}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="h6" fontWeight={700} whiteSpace="nowrap">
                                {itemName}
                            </Typography>
                            <Box sx={optionTickStyle(value?.items?.includes(id))}>
                                <Done sx={{ fontSize: 14 }} />
                            </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            ({category.charAt(0) + category.slice(1).toLowerCase()})
                        </Typography>
                    </Box>
                ))}
            </Box>
            {error?.items ? (
                <Typography mx={1.75} mt={0.5} fontSize="0.75rem" color="error">
                    {error?.items}
                </Typography>
            ) : null}
        </Box>
    );
}
