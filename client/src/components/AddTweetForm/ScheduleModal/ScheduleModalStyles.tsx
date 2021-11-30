import {makeStyles, Theme} from "@material-ui/core";

export const useScheduleModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDialog-container": {
            height: "80%"
        },
    },
    content: {
        width: 598,
        overflowX: "hidden",
        padding: 0,
    },
    contentWrapper: {
        padding: "12px 16px",
    },
    buttonWrapper: {
        marginLeft: "auto",
    },
    clearButton: {
        marginRight: 12,
        "&.MuiButton-root": {
            padding: "4px 16px",
            border: 0,
            '&:hover': {
                border: 0,
            },
        },
    },
    submitButton: {
        "&.MuiButton-root": {
            padding: "4px 16px",
        },
    },
    infoWrapper: {
        marginBottom: 20,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 12,
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
    text: {
        fontSize: 13,
        fontWeight: 400,
        lineHeight: "16px",
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 20,
        fontWeight: 400,
        lineHeight: "24px",
        color: theme.palette.text.primary,
    },
    subtitle: {
        marginBottom: 2,
        fontSize: 15,
        fontWeight: 400,
        lineHeight: "20px",
        color: theme.palette.text.secondary,
    },
    errorText: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: "20px",
        color: theme.palette.error.main,
    },
    dateWrapper: {
        marginBottom: 20,
    },
    footer: {
        "& .MuiButton-root": {
            marginRight: 15,
            fontSize: 14,
            fontWeight: 700,
            lineHeight: "16px",
            border: 0,
            padding: '2px 15px',
            '&:hover': {
                border: 0,
                backgroundColor: theme.palette.secondary.light,
            },
        },
        padding: "12px 16px",
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    outlinedButton: {

    },
}));
