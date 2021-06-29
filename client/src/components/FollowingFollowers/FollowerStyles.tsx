import {makeStyles} from "@material-ui/core";

export const useStylesFollower = makeStyles((theme) => ({
    follower: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8
    },
    followerAvatar: {
        width: theme.spacing(6.7),
        height: theme.spacing(6.7),
        marginRight: 15,
    },
    followerBtn: {
        float: 'right',
        marginRight: 15,
        height: 35,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
    },
    followerWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    followerFullName: {
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        fontSize: 15
    },
    followerUsername: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
    },
}));
