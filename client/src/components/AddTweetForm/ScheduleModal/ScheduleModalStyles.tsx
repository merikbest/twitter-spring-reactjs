import {makeStyles, Theme} from "@material-ui/core";

export const useScheduleModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
            borderBottom: "1px solid rgb(239, 243, 244)"
        },
        "& .MuiIconButton-root": {
            marginRight: 15,
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
            fill: "rgb(83, 100, 113)",
            height: "1.30em",
        },
    },
    text: {
        fontSize: 13,
        fontWeight: 400,
        lineHeight: "16px",
        color: "rgb(83, 100, 113)",
    },
    title: {
        fontSize: 20,
        fontWeight: 400,
        lineHeight: "24px",
        color: "rgb(15, 20, 25)",
    },
    subtitle: {
        marginBottom: 2,
        fontSize: 15,
        fontWeight: 400,
        lineHeight: "20px",
        color: "rgb(83, 100, 113)",
    },
    errorText: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: "20px",
        color: "rgb(244, 33, 46)",
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
                backgroundColor: 'rgb(29, 161, 242, 0.1)',
            },
        },
        padding: "12px 16px",
        borderTop: "1px solid rgb(239, 243, 244)"
    },
    outlinedButton: {

    },
}));
