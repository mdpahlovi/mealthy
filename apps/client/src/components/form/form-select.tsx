import { Controller } from "react-hook-form";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";

type InputProps = { items: string[]; name: string; label?: string; disabled?: boolean };

export default function FormInput({ items, name, label, disabled }: InputProps) {
    return (
        <Controller
            name={name}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
                let configTextfield: TextFieldProps = {
                    label,
                    value,
                    onChange,
                    error: invalid,
                    helperText: error?.message,
                    disabled,
                };

                return (
                    <TextField
                        {...configTextfield}
                        sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" } }}
                        select
                    >
                        {items.map((item, idx) => (
                            <MenuItem key={idx} value={item}>
                                {item.charAt(0) + item.slice(1).toLowerCase()}
                            </MenuItem>
                        ))}
                    </TextField>
                );
            }}
        />
    );
}
