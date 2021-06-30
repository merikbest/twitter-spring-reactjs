import {makeStyles} from "@material-ui/core";

export const useStylesFollower = makeStyles((theme) => ({
    followersWrapper: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
    },
    followersHeader: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        '& h6': {
            fontWeight: 800,
        },
    },
    followersCentred: {
        marginTop: 50,
        textAlign: 'center',
    },
    followersTab: {
        minWidth: 301,
        textTransform: 'none',
    },
    follower: {
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
            backgroundColor: 'rgb(245, 248, 250)',
        },
    },
    followerProfileMenu: {
        top: 'auto !important',
        left: '17.5% !important',
        width: '250px !important',
        bottom: '110px !important',
        'box-shadow': '1px 1px 10px rgba(0, 0, 0, 0.08)',
        'border-radius': '20px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '& a': {
            color: 'black',
            textDecoration: 'none',
        },
    },
    followerAvatar: {
        width: theme.spacing(6.7),
        height: theme.spacing(6.7),
        marginRight: 15,
    },
    followerLink: {
        textDecoration: 'none',
    },
    followerBtn: {
        float: 'right',
        marginRight: 15,
        width: 105,
        height: 35,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: 'rgb(202, 32, 85)',
        },
    },
    followerWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    followerFullName: {
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        fontSize: 15,
    },
    followerUsername: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
    },
    followersTopicWrapper: {
        margin: "40px 20px",
        textAlign: "center"
    },
    followersTopic: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 12
    },
    followersText: {
        fontSize: 15,
        fontWeight: 400,
        marginBottom: 16,
        color: "rgb(83, 100, 113)"
    },
}));
