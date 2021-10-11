import {makeStyles, Theme} from "@material-ui/core";

export const useTopTweetsActionsModalStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            color: "rgb(27, 149, 224)",
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
                backgroundColor: 'rgb(247, 249, 249)',
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
        color: "rgb(83, 100, 113)",
    },
    textIcon: {
        paddingTop: 20,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: "rgb(83, 100, 113)",
            height: "1.30em",
        },
    },
}));
