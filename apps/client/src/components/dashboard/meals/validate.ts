import { Error, Value } from "@/pages/dashboard/create-meal";
import { Item } from "@prisma/client";

type ValidateProps = {
    value: Value;
    setError: React.Dispatch<React.SetStateAction<Error>>;
    mealItems: Item[];
};

export const validate = ({ value: { day, items }, setError, mealItems }: ValidateProps): boolean => {
    if (!day) {
        setError((error) => ({ ...error, day: "Please select a day" }));
        return false;
    }

    const riceItem = items.some((id) => {
        const item = mealItems.find((item) => item.id === id);
        return item?.category === "STARCH";
    });

    const proteinItems = items.filter((id) => {
        const item = mealItems.find((item) => item.id === id);
        return item?.category === "PROTEIN";
    });

    if (items.length < 3) {
        setError((error) => ({ ...error, items: "Meal must have at least 3 items to be complete." }));
        return false;
    }
    if (!riceItem) {
        setError((error) => ({ ...error, items: "Meal must have a rice item to be complete." }));
        return false;
    }
    if (proteinItems.length > 1) {
        setError((error) => ({ ...error, items: "Meal cannot have two protein sources at a time." }));
        return false;
    }

    return true;
};
