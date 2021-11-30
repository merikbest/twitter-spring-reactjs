import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useTweetComponentChangeReplyStyles = makeStyles((theme: Theme) => createStyles({
    textListItem: {
        fontSize: 15,
        fontWeight: 400,
    },
    textIconListItem: {
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
    dropdown: {
        position: 'absolute',
        width: 320,
        height: 284,
        zIndex: 2,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
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
        backgroundColor: theme.palette.common.white,
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
