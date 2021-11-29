import {makeStyles, Theme} from "@material-ui/core";

export const useActionSnackbarStyles = makeStyles<Theme>((theme) => ({
    snackBar: {
        "& .MuiSnackbarContent-root": {
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
