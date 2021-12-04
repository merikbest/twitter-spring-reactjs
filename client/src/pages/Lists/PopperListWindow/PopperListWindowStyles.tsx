import {makeStyles, Theme} from "@material-ui/core";

export const usePopperListWindowStyles = makeStyles((theme: Theme) => ({
    popperListWindow: {
        position: "absolute",
        width: 300,
        minHeight: 213,
        zIndex: 2,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        cursor: "default",
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
    },
    wallpaperListImg: {
        borderRadius: "16px 16px 0px 0px",
        width: "100%",
        height: "100%",
        inset: 0,
    },
    popperListInfo: {
        borderRadius: 16,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        padding: 12,
        textAlign: "center",
    },
    popperListTitle: {
        marginBottom: 12,
        fontSize: 20,
        fontWeight: 700,
    },
    popperListDescription: {
        marginBottom: 12,
        fontSize: 15,
    },
    popperListOwnerLink: {
        color: "black",
        textDecoration: "none",
    },
    popperListOwnerWrapper: {
        display: "inline-block",
    },
    popperListOwnerAvatar: {
        marginRight: 4,
        width: "20px !important",
        height: "20px !important",
    },
    popperListOwnerFullName: {
        color: theme.palette.text.primary,
        verticalAlign: "top",
        fontSize: 15,
        fontWeight: 700,
        marginRight: 4,
        "&:hover": {
            textDecoration: "underline",
        },
    },
    popperListOwnerUsername: {
        verticalAlign: "top",
        color: theme.palette.text.secondary,
        fontSize: 15,
    },
    popperListMembers: {
        marginLeft: 20,
        color: theme.palette.text.secondary,
        fontSize: 15,
        "& b" : {
            color: theme.palette.text.primary,
        },
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        },
    },
    buttonWrapper: {
        marginTop: 20,
        marginBottom: 12,
        fontSize: 15,
        fontWeight: 700,
    },
    listOutlinedButton: {
        width: 105,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    outlinedButton: {
        width: 79,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    primaryButton: {
        width: 105,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));
