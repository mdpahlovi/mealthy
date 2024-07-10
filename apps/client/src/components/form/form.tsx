import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

type FormProps<T> = {
    defaultValues?: T;
    validationSchema?: any;
    onSubmit: (data: T, reset: () => void) => void;
} & React.PropsWithChildren;

export default function Form<T>({ onSubmit, children, defaultValues, validationSchema }: FormProps<T>) {
    const resolver = validationSchema ? yupResolver(validationSchema) : undefined;
    const methods = useForm({ defaultValues, resolver });

    const submit = (data: T) => onSubmit(data, methods.reset);

    return (
        <FormProvider {...methods}>
            <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={methods.handleSubmit(submit)}>
                {children}
            </form>
        </FormProvider>
    );
}
