import {makeStyles} from "@material-ui/core";

export const useFollowingFollowersStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
    },
    header: {
        position: "fixed",
        display: 'flex',
        width: 602,
        zIndex: 1,
        border: 0,
        alignItems: 'center',
        flex: 1,
        '& h6': {
            fontWeight: 800,
        },
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
    loading: {
        marginTop: 50,
        textAlign: 'center',
    },
    content: {
        margin: "40px 20px",
        textAlign: "center"
    },
    topic: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 12
    },
    text: {
        fontSize: 15,
        fontWeight: 400,
        marginBottom: 16,
        color: "rgb(83, 100, 113)"
    },
    link: {
        textDecoration: 'none',
    },
}));
