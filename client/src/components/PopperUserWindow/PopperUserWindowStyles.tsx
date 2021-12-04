import {makeStyles, Theme} from "@material-ui/core";

interface PopperUserWindowStylesProps {
    isTweetComponent?: boolean;
}

export const usePopperUserWindowStyles = makeStyles<Theme, PopperUserWindowStylesProps>((theme) => ({
    popperUserWindow: {
        position: "absolute",
        width: 300,
        minHeight: 204,
        padding: 16,
        zIndex: 2,
        marginTop: props => props.isTweetComponent ? 0 : -20,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        cursor: "default",
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
    },
    tweetComponent: {
        left: props => props.isTweetComponent ? -100 : -50
    },
    tweetImageModal: {
        marginTop: -10,
        right: 20
    },
    headerWrapper: {
        display: "flex",
        justifyContent: "space-between",
    },
    avatar: {
        width: "60px !important",
        height: "60px !important",
        marginRight: 15,
    },
    outlinedButton: {
        float: 'right',
        fontSize: 15,
        fontWeight: 700,
        width: 79,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px !important',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    primaryButton: {
        display: "inline-block",
        float: 'right',
        fontSize: 15,
        fontWeight: 700,
        width: 105,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px !important',
        '&:hover': {
            backgroundColor: 'rgb(202, 32, 85) !important',
        },
    },
    userInfoWrapper: {
        display: "inline-block",
        marginTop: 4,
        fontSize: 15,
        "& a": {
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline !important",
            },
        },
    },
    fullName: {
        color: theme.palette.text.primary,
    },
    username: {
        color: theme.palette.text.secondary,
    },
    lockIcon: {
        "& svg": {
            color: theme.palette.text.primary,
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    userInfo: {
        marginTop: 12,
        marginBottom: 12,
        fontSize: 15,
    },
    details: {
        display: "flex",
        listStyle: "none",
        flexWrap: "wrap",
        color: theme.palette.info.light,
    },
    userFollowersWrapper: {
        fontSize: 15,
    },
    followLink: {
        textDecoration: 'none',
        "&:hover": {
            textDecoration: "underline !important",
        },
    },
    followerCount: {
        marginRight: 2,
        color: theme.palette.text.primary,
    },
    followerText: {
        marginRight: 10,
        color: theme.palette.text.secondary,
    },
}));
