import { useState } from "react";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

type InputProps = { type?: React.HTMLInputTypeAttribute; name: string; label?: string; disabled?: boolean };

export default function FormInput({ type = "text", name, label, disabled }: InputProps) {
    const [show, setShow] = useState(false);

    return (
        <Controller
            name={name}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
                let configTextfield: TextFieldProps = {
                    type,
                    label,
                    value,
                    onChange,
                    error: invalid,
                    helperText: error?.message,
                    disabled,
                };

                if (type === "password") {
                    configTextfield.type = show ? "text" : "password";
                    return (
                        <TextField
                            {...configTextfield}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ ":hover": { cursor: "pointer" } }} onClick={() => setShow(!show)}>
                                        {show ? <Visibility /> : <VisibilityOff />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    );
                } else {
                    return (
                        <TextField {...configTextfield} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" } }} />
                    );
                }
            }}
        />
    );
}
