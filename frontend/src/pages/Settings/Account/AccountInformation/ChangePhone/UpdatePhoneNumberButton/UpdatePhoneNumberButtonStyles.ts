import { makeStyles } from "@material-ui/core";

export const useUpdatePhoneNumberButtonStyles = makeStyles((theme) => ({
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
    }
}));
