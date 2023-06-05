import { makeStyles } from "@material-ui/core";

export const useScheduleModalStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialog-container": {
            height: "80%"
        }
    },
    content: {
        width: 598,
        overflowX: "hidden",
        padding: 0
    },
    contentWrapper: {
        padding: "12px 16px"
    },
    buttonWrapper: {
        marginLeft: "auto",
        "& .MuiButton-text ": {
            marginRight: 12
        }
    },
    infoWrapper: {
        marginBottom: 20,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 12,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    },
    title: {
        fontWeight: 400
    },
    subtitle: {
        marginBottom: 2
    },
    errorText: {
        color: theme.palette.error.main
    },
    dateWrapper: {
        marginBottom: 20
    },
    footer: {
        padding: "12px 16px",
        borderTop: `1px solid ${theme.palette.divider}`,
        "& .MuiButton-root": {
            height: 24,
            padding: "0px 12px"
        }
    }
}));
