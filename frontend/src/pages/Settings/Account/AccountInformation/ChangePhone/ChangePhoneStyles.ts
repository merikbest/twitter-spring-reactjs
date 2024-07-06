import { makeStyles } from "@material-ui/core";

export const useChangePhoneStyles = makeStyles((theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
        "& .MuiFormLabel-root.Mui-disabled": {
            color: theme.palette.grey[500]
        }
    },
    updatePhoneNumber: {
        textAlign: "center",
        padding: 16,
        "& .MuiTypography-body1": {
            color: theme.palette.primary.main
        },
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(29, 155, 240, 0.1)"
        }
    },
    deletePhoneNumber: {
        textAlign: "center",
        padding: 16,
        "& .MuiTypography-body1": {
            color: theme.palette.error.main
        },
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    }
}));
