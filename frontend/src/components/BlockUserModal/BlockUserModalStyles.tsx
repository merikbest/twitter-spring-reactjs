import { makeStyles } from "@material-ui/core";

export const useBlockUserModalStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialogContent-root": {
            padding: 32,
            width: 320
        },
        textAlign: "center"
    },
    text: {
        marginTop: 8,
        marginBottom: 24
    },
    containedButton: {
        marginBottom: 12
    },
    blockButton: {
        "&.MuiButtonBase-root": {
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: "rgb(220, 30, 41)"
            }
        }
    },
    unblockButton: {
        backgroundColor: theme.palette.primary.main
    }
}));
