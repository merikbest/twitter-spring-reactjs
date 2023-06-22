import { makeStyles } from "@material-ui/core";

export const useActionSnackbarStyles = makeStyles((theme) => ({
    snackBar: {
        "& .MuiPaper-root": {
            border: "none"
        },
        "& .MuiSnackbarContent-root": {
            color: theme.palette.common.white,
            height: 44,
            padding: "0px 15px",
            backgroundColor: theme.palette.primary.main,
            "& .MuiSnackbarContent-message": {
                fontSize: 15,
                margin: "0 auto",
                textAlign: "center"
            }
        }
    }
}));
