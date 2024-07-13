import type { Item } from "@prisma/client";
import { Box, Typography } from "@mui/material";
import { SelectContainer, SelectTick } from "@/components/ui";
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

    return (
        <Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {mealItems?.map(({ id, name: itemName, category }, idx) => (
                    <SelectContainer key={idx} isSelected={value?.items?.includes(id)} onClick={() => handleSelect(id)}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="h6" fontWeight={700} whiteSpace="nowrap">
                                {itemName}
                            </Typography>
                            <SelectTick isSelected={value?.items?.includes(id)} />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            ({category.charAt(0) + category.slice(1).toLowerCase()})
                        </Typography>
                    </SelectContainer>
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
