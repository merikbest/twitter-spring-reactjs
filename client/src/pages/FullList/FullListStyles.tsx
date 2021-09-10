import {makeStyles, Theme} from "@material-ui/core";

export const useFullListStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        marginBottom: 500,
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
        '& h6': {
            fontWeight: 800,
        },
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
    },
    listOwnerUsername: {
        verticalAlign: "top",
        color: "rgb(83, 100, 113)",
        fontSize: 15,
    },
    listMembers: {
        marginLeft: 20,
        color: "rgb(83, 100, 113)",
        fontSize: 15,
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
            backgroundColor: 'rgb(29, 161, 242, 0.1)',
        },
    },
    outlinedButton: {
        width: 79,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: 'rgb(29, 161, 242, 0.1)',
        },
    },
    primaryButton: {
        width: 105,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: 'rgb(202, 32, 85)',
        },
    },
}));
