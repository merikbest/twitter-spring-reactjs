import {makeStyles, Theme} from "@material-ui/core";

interface PopperUserWindowStylesProps {
    isTweetComponent?: boolean;
}

export const usePopperUserWindowStyles = makeStyles<Theme, PopperUserWindowStylesProps>((theme) => ({
    popperUserWindow: {
        position: "absolute",
        width: 300,
        minHeight: "auto",
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
    },
    outlinedButton: {
        float: 'right',
        width: 79,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    containedButton: {
        float: 'right',
        width: 105,
        '&:hover': {
            backgroundColor: 'rgb(202, 32, 85) !important',
        },
    },
    userInfoWrapper: {
        display: "inline-block",
        marginTop: 4,
        "& a": {
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline !important",
            },
        },
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
        whiteSpace: "initial",
    },
    details: {
        display: "flex",
        listStyle: "none",
        flexWrap: "wrap",
        color: theme.palette.info.light,
    },
    userFollowersWrapper: {
        "& .MuiTypography-h6": {
            marginRight: 2,
        },
        "& .MuiTypography-subtitle1": {
            marginRight: 10,
        },
    },
    followLink: {
        textDecoration: 'none',
        color: "inherit",
        "&:hover": {
            textDecoration: "underline !important",
        },
    },
    blockButton: {
        backgroundColor: theme.palette.error.main,
    },
}));
