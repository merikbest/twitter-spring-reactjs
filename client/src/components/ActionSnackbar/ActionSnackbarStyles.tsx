import {makeStyles, Theme} from "@material-ui/core";

export const useActionSnackbarStyles = makeStyles<Theme>((theme) => ({
    snackBar: {
        "& .MuiPaper-root": {
            border: "none",
        },
        "& .MuiSnackbarContent-root": {
            color: theme.palette.common.white,
            width: 179,
            height: 44,
            padding: 0,
            backgroundColor: theme.palette.primary.main,
            "& .MuiSnackbarContent-message": {
                fontSize: 15,
                margin: "0 auto",
                textAlign: "center",
            },
        },
    },
}));
