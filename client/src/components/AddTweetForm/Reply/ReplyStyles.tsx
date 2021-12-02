import {makeStyles, Theme} from "@material-ui/core";

export const useReplyStyles = makeStyles((theme: Theme) => ({
    reply: {
        position: 'relative',
        marginTop: 5,
        "& .MuiButton-root": {
            marginLeft: 50,
            fontSize: 14,
            fontWeight: 700,
            padding: "0px 8px",
            "& svg": {
                marginTop: 3,
                marginRight: 3,
                height: "1.2em",
            },
        },
        "& .MuiButton-root.Mui-disabled": {
            color: theme.palette.primary.light
        },
        "& .MuiDivider-root": {
            marginLeft: 50,
            marginTop: 8,
        },
    },
    popover: {
        "& .MuiPaper-root": {
            boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
            borderRadius: 16,
        }
    },
    dropdown: {
        width: 320,
        height: 284,
        zIndex: 2,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
    },
    infoWrapper: {
        fontSize: 15,
        padding: "16px 16px 0px 16px",
    },
    title: {
        fontWeight: 700,
    },
    text: {
        color: theme.palette.text.secondary,
    },
    listItem: {
        fontSize: 15,
        height: 60,
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&.MuiListItem-button": {
            "&:hover": {
                backgroundColor: theme.palette.secondary.main,
            },
        },
    },
    iconCircle: {
        marginRight: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        "& svg": {
            marginTop: 5,
            height: "1.35em",
            fill: theme.palette.common.white,
        },
    },
    checkIcon: {
        marginLeft: "auto",
        "& svg": {
            color: theme.palette.primary.main,
            marginTop: 5,
            height: "1.3em",
        },
    },
}));
