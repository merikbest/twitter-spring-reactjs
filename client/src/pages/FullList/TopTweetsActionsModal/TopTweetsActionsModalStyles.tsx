import {makeStyles, Theme} from "@material-ui/core";

export const useTopTweetsActionsModalStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            color: theme.palette.primary.main,
            "& .MuiIconButton-label": {
                "& svg": {
                    verticalAlign: "bottom",
                    height: "0.9em",
                },
            },
        },
    },
    dropdown: {
        padding: 0,
        position: 'absolute',
        width: 386,
        height: 178,
        top: 10,
        right: 15,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            padding: 0,
        },
        '& .MuiListItem-root': {
            display: "block",
            padding: 13,
            '&:hover': {
                borderRadius: 4,
                cursor: 'pointer',
                backgroundColor: theme.palette.secondary.main,
            },
        },
    },
    listItemWrapper: {
        display: "flex",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 15,
    },
    text: {
        fontSize: 13,
        color: theme.palette.text.secondary,
    },
    textIcon: {
        paddingTop: 20,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
}));
