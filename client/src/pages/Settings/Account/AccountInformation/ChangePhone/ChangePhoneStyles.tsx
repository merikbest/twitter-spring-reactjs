import {makeStyles, Theme} from "@material-ui/core";

export const useChangePhoneStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
        "& .MuiFormLabel-root.Mui-disabled": {
            color: theme.palette.grey[500],
        },
    },
    updatePhoneNumber: {
        textAlign: "center",
        padding: 16,
        color: theme.palette.primary.main,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(29, 155, 240, 0.1)"
        }
    },
    deletePhoneNumber: {
        textAlign: "center",
        padding: 16,
        color: theme.palette.error.main,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
}));
