import { makeStyles } from "@material-ui/core";

export const usePopperListWindowStyles = makeStyles((theme) => ({
    popperListWindow: {
        position: "absolute",
        width: 300,
        minHeight: 213,
        zIndex: 2,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        cursor: "default",
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px"
    },
    wallpaperListImg: {
        borderRadius: "16px 16px 0px 0px",
        width: "100%",
        height: "100%",
        inset: 0
    },
    popperListInfo: {
        borderRadius: 16,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        padding: 12,
        textAlign: "center"
    },
    popperListTitle: {
        marginBottom: 12,
        fontWeight: 700
    },
    popperListDescription: {
        marginBottom: 12
    },
    popperListOwnerLink: {
        color: "black",
        textDecoration: "none"
    },
    popperListOwnerWrapper: {
        display: "inline-block"
    },
    popperListOwnerAvatar: {
        marginRight: 4,
        width: "20px !important",
        height: "20px !important"
    },
    popperListOwnerFullName: {
        verticalAlign: "top",
        fontWeight: 700,
        marginRight: 4,
        "&:hover": {
            textDecoration: "underline"
        }
    },
    popperListOwnerUsername: {
        verticalAlign: "top"
    },
    buttonWrapper: {
        marginTop: 20,
        marginBottom: 12
    },
    outlinedButton: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    primaryButton: {
        width: 105,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    }
}));
