import { ManageAccounts } from "@mui/icons-material";
import { Avatar, Box, IconButton } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function FormImage({ name, disabled }: { name: string; disabled?: boolean }) {
    const { setValue } = useFormContext();

    return (
        <Controller
            name={name}
            render={({ field: { value } }) => (
                <>
                    <Avatar src={value} variant="rounded" style={{ aspectRatio: 1, width: 132, height: 132 }} />
                    {!disabled ? (
                        <Box sx={{ position: "absolute", zIndex: 2, left: 96, top: 192 }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const fileReader = new FileReader();
                                    fileReader.onload = () => {
                                        if (fileReader.readyState === 2) setValue(name, fileReader.result);
                                    };
                                    fileReader.readAsDataURL(e.target.files![0]);
                                }}
                                style={{ position: "absolute", zIndex: 3, width: 32, height: 32, opacity: 0 }}
                                disabled={disabled}
                            />
                            <IconButton>
                                <ManageAccounts style={{ paddingLeft: 2.5 }} />
                            </IconButton>
                        </Box>
                    ) : null}
                </>
            )}
        />
    );
}
