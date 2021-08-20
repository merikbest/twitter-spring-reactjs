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
        width: 602,
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
    },
}));
