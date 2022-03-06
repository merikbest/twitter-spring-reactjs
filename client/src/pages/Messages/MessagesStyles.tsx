import {makeStyles, Theme} from "@material-ui/core";

export const useMessagesStyles = makeStyles((theme: Theme) => ({
    grid: {
        padding: "12px 0px 0px 0px !important",
    },
    header: {
        width: 416,
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
    icon: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: theme.palette.primary.main,
                verticalAlign: "bottom",
                height: "0.90em",
            },
        },
    },
    messagesTitle: {
        paddingTop: 83,
        margin: "0px 30px",
    },
    messagesText: {
        margin: "8px 30px 27px 30px",
    },
    messagesButton: {
        marginLeft: 30,
        height: 52,
    },
    searchWrapper: {
        paddingTop: 60,
    },
    list: {
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.secondary.dark,
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
            },
        },
    },
    listItem: {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    userWrapper: {
        height: 76,
        borderTop: `1px solid ${theme.palette.divider}`,
        width: "100%",
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: 'pointer',
    },
    userAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 15,
    },
    username: {
        marginLeft: 5,
    },
    chatContainer: {
        minWidth: 600,
        padding: 0,
        borderLeft: 0,
    },
    chatHeader: {
        width: 598,
    },
}));
