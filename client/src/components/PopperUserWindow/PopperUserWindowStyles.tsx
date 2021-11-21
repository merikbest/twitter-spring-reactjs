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
        backgroundColor: "#fff",
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
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px !important',
        '&:hover': {
            backgroundColor: 'rgb(29, 161, 242, 0.1)',
        },
    },
    primaryButton: {
        display: "inline-block",
        float: 'right',
        fontSize: 15,
        fontWeight: 700,
        width: 105,
        height: 32,
        border: '1px solid',
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
            color: "#000",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline !important",
            },
        },
    },
    lockIcon: {
        "& svg": {
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
        color: "#5b7083",
    },
    userFollowersWrapper: {
        fontSize: 15,
        "& span": {
            marginRight: 10,
        },
    },
    followLink: {
        textDecoration: 'none',
        color: "#000",
        "&:hover": {
            textDecoration: "underline !important",
        },
    },
}));
