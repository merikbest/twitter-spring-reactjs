import {makeStyles} from "@material-ui/core";

export const useFollowerStyles = makeStyles((theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
    listAvatar: {
        width: "46px !important",
        height: "46px !important",
        marginRight: 15,
    },
    followerInfo: {
        position: "relative",
        maxWidth: 350
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fullName: {
        lineHeight: "20px",
        color: theme.palette.text.primary,
        fontWeight: 800,
        fontSize: 15,
    },
    username: {
        lineHeight: "20px",
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    outlinedButton: {
        float: 'right',
        marginRight: 15,
        width: 79,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    containedButton: {
        float: 'right',
        marginRight: 15,
        width: 105,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));
