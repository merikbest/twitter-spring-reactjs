import {makeStyles, Theme} from "@material-ui/core";

export const useLeaveFromConversationModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        minHeight: 176,
        textAlign: "center",
        margin: "32px 20px",
        "& .MuiTypography-subtitle1": {
            margin: "8px 0px 24px",
        },
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
