import {makeStyles, Theme} from "@material-ui/core";

export const useSessionsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontWeight: 400,
        lineHeight: "16px",
    },
    title: {
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: theme.palette.text.primary,
    },
    sessionWrapper: {
        textDecoration: "none",
    },
    sessionLink: {
        padding: "12px 16px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer"
        },
    },
    sessionInfo: {
        display: "inline-flex",
        justifyContent: "flex-start"
    },
    OSTypeText: {
        fontSize: 15,
        color: theme.palette.text.primary,
        fontWeight: 400,
        lineHeight: "20px",
    },
    active: {
        padding: "1px 4px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4,
        height: 20,
        color: theme.palette.common.white,
        fontSize: 13,
        lineHeight: "16px",
    },
    deviceIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 48,
        height: 48,
        border: "1px solid rgb(229, 234, 236)",
        borderRadius: "50%",
    },
    deviceIcon: {
        "& svg": {
            color: theme.palette.text.primary,
            height: "1.7em"
        },
    },
    arrowIcon: {
        "& svg": {
            marginTop: 15,
            float: "right",
            color: theme.palette.text.secondary,
            height: "1.4em"
        },
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    logOut: {
        padding: 16,
        color: theme.palette.error.main,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
}));
