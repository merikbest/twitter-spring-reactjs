import { makeStyles } from "@material-ui/core";

export const useDialogWrapperStyles = makeStyles((theme) => ({
    dialogContent: {
        width: 550,
        minHeight: 600,
        padding: "5px 30px !important"
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            height: "1.75rem",
            width: "1.75rem",
            color: theme.palette.primary.main
        }
    },
    button: {
        width: 490,
        position: "absolute",
        bottom: 0,
        marginBottom: 15
    }
}));
