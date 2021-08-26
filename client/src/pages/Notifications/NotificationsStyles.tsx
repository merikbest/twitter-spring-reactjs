import {makeStyles, Theme} from "@material-ui/core";

export const useNotificationsStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
    },
    header: {
        marginLeft: 15,
        position: "fixed",
        display: 'flex',
        width: 580,
        height: 53,
        zIndex: 1,
        border: 0,
        alignItems: 'center',
        flex: 1,
        '& h6': {
            fontWeight: 800,
        },
        "& svg": {
            marginRight: 20
        },
    },
    loading: {
        marginTop: 50,
        textAlign: 'center',
    },
    title: {
        textAlign: "center",
        marginTop: 30,
        marginBottom: 8,
        fontSize: 29,
        fontWeight: 800,
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 400,
        color: "rgb(83, 100, 113)",
    },
    tabs: {
        borderBottom: "1px solid rgb(239, 243, 244)",
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: "rgb(29, 161, 242)",
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    tab: {
        minWidth: 301,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(29, 161, 242, 0.1)',
        },
    },
    notificationLink: {
        textDecoration: "none",
    },
    notificationWrapper: {
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'flex-start',
        padding: "11px 15px",
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },

    },
    notificationIcon: {
        alignItems: "flex-end",
        marginLeft: 15,
        marginRight: 11,
        '& #retweet': {
            color: "rgb(23, 191, 99)",
        },
        '& #like': {
            color: "rgb(224, 36, 94)",
        },
        "& svg": {
            verticalAlign: "bottom",
            height: "2.30em",
        },
    },
    notificationAvatar: {
        display: "inline-block",
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginBottom: 11,
    },
    notificationInfo: {
        fontSize: 14,
        marginBottom: 11,
    },
    notificationText: {
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
    },
}));
