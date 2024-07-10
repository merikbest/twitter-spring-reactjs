import { makeStyles } from "@material-ui/core";

export const useChangePhoneStyles = makeStyles((theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
        "& .MuiFormLabel-root.Mui-disabled": {
            color: theme.palette.grey[500]
        }
    }
}));
