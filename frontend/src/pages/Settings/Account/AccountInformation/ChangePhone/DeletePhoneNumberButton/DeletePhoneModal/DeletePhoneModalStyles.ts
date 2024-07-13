import { makeStyles } from "@material-ui/core";

export const useDeletePhoneNumberButtonStyles = makeStyles((theme) => ({
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
    blockButton: {
        marginBottom: 12,
        "&.MuiButtonBase-root": {
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: "rgb(220, 30, 41)"
            }
        }
    },
}));
