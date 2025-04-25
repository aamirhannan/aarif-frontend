import { TextField } from "@mui/material";

const CustomTextField = ({ margin = "normal", required = true, fullWidth = false, label = "", name = "", value = "", onChange, error = false, helperText = "", autoComplete = "", autoFocus = false }) => {
    return (
        <TextField
            margin={margin}
            required={required}
            fullWidth={fullWidth}
            id={name}
            label={label}
            name={name}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={helperText}
        />
    )
}

export default CustomTextField;
