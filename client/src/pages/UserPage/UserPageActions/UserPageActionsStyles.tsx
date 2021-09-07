import {makeStyles, Theme} from "@material-ui/core";

export const useUserPageActionsStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative',
        display: "inline-block",
    },
    dropdown: {
        position: 'absolute',
        width: 358,
        height: 468,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            fontSize: 15,
            padding: 0,
            margin: 0,
        },
        '& .MuiListItem-root': {
            margin: 0,
            height: 52,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgb(247, 249, 249)',
            },
        },
    },
    messageButton: {
        marginTop: 84,
        marginRight: 9,
        fontSize: 15,
        fontWeight: 700,
        border: '1px solid',
        borderRadius: '50%',
        padding: 8,
        "& svg": {
            color: "rgb(27, 149, 224)",
            height: "1.6em",
        },
    },
    text: {
        fontSize: 15,
        fontWeight: 400,
    },
    textIcon: {
        marginRight: 12,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: "rgb(83, 100, 113)",
            height: "1.30em",
        },
    },
}));
