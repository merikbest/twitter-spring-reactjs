import { makeStyles } from "@material-ui/core";

export const useDeletePhoneNumberButtonStyles = makeStyles((theme) => ({
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
