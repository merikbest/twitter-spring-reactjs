import {makeStyles, Theme} from "@material-ui/core";

export const useBlockUserModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogContent-root": {
            padding: 32,
            width: 320
        },
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center",
        lineHeight: "24px",
        color: "rgb(15, 20, 25)",
    },
    text: {
        marginTop: 8,
        marginBottom: 24,
        fontSize: 15,
        fontWeight: 400,
        textAlign: "center",
        lineHeight: "20px",
        color: "rgb(83, 100, 113)",
    },
    containedButton: {
        "&.MuiButtonBase-root": {
            padding: "11px 16px",
            marginBottom: 12,
            "& .MuiButton-label": {
                fontSize: 15,
                fontWeight: 700,
                lineHeight: "20px",
                color: "rgb(255, 255, 255)",
            },
        },
    },
    blockButton: {
        "&.MuiButtonBase-root": {
            backgroundColor: "rgb(244, 33, 46)",
            "&:hover" : {
                backgroundColor: "rgb(220, 30, 41)",
            },
        }
    },
    unblockButton: {
        backgroundColor: "rgb(29, 161, 242)",
    },
    cancelButton: {
        "&.MuiButtonBase-root": {
            padding: "11px 16px",
            "& .MuiButton-label": {
                fontSize: 15,
                fontWeight: 700,
                lineHeight: "20px",
                color: "rgb(29, 161, 242)",
            },
        },
    },
}));
