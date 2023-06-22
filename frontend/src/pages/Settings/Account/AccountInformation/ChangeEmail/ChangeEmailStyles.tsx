import { makeStyles } from "@material-ui/core";

export const useChangeEmailStyles = makeStyles((theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
        "& .MuiFormLabel-root.Mui-disabled": {
            color: theme.palette.grey[500]
        }
    },
    updateEmailAddress: {
        textAlign: "center",
        padding: 16,
        "& .MuiTypography-body1": {
            color: theme.palette.primary.main
        },
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(29, 155, 240, 0.1)"
        }
    }
}));
