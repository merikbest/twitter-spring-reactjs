import {makeStyles, Theme} from "@material-ui/core";

export const useLeaveFromConversationModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        minHeight: 176,
        textAlign: "center",
        margin: "32px 20px",
    },
    title: {
        marginBottom: 8,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.palette.text.primary,
        fontWeight: 700,
    },
    text: {
        fontSize: 15,
        lineHeight: "20px",
        color: theme.palette.text.secondary,
        fontWeight: 400,
        marginBottom: 24,
    },
    blockButton: {
        "&.MuiButtonBase-root": {
            padding: "11px 16px",
            marginBottom: 12,
            backgroundColor: theme.palette.error.main,
            "& .MuiButton-label": {
                fontSize: 15,
                fontWeight: 700,
                lineHeight: "20px",
                color: theme.palette.common.white,
            },
            "&:hover" : {
                backgroundColor: "rgb(220, 30, 41)",
            },
        },
    },
    cancelButton: {
        "&.MuiButtonBase-root": {
            padding: "11px 16px",
            "& .MuiButton-label": {
                fontSize: 15,
                fontWeight: 700,
                lineHeight: "20px",
                color: theme.palette.primary.main,
            },
        },
    },
}));
