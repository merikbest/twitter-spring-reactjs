import {makeStyles, Theme} from "@material-ui/core";

export const useFullListStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        paddingBottom: 500,
        borderTop: 0,
        borderBottom: 0,
    },
    header: {
        position: "fixed",
        width: 602,
        height: 53,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    headerFullName: {
        fontWeight: 800,
        fontSize: 20,
        lineHeight: "24px",
    },
    headerUsername: {
        fontSize: 13,
        lineHeight: "16px",
        color: theme.palette.text.secondary,
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
    content: {
        paddingTop: 53
    },
    wallpaper: {
        height: 200,
        "& img": {
            objectFit: "cover",
            position: "absolute",
            width: 601,
            height: 200,
        },
    },
    listInfo: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        padding: 12,
        textAlign: "center",
    },
    listTitle: {
        marginBottom: 12,
        fontSize: 20,
        fontWeight: 700,
    },
    listDescription: {
        marginBottom: 12,
        fontSize: 15,
    },
    listOwnerLink: {
        color: "black",
        textDecoration: "none",
    },
    listOwnerWrapper: {
        display: "inline-block",
    },
    listOwnerAvatar: {
        marginRight: 4,
        width: "20px !important",
        height: "20px !important",
    },
    listOwnerFullName: {
        verticalAlign: "top",
        fontSize: 15,
        fontWeight: 700,
        marginRight: 4,
        "&:hover": {
            textDecoration: "underline",
        },
    },
    listOwnerUsername: {
        verticalAlign: "top",
        color: theme.palette.text.secondary,
        fontSize: 15,
    },
    listMembers: {
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
    listInfoWrapper: {
        width: 350,
        margin: "0 auto",
        marginTop: 32,
        textAlign: "center",
    },
    listInfoTitle: {
        lineHeight: "36px",
        fontSize: 31,
        fontWeight: 800,
        marginBottom: 8,
    },
    listInfoText: {
        lineHeight: "20px",
        fontSize: 15,
        color: theme.palette.text.secondary,
    },
}));
