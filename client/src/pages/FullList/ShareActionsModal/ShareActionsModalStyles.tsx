import {makeStyles, Theme} from "@material-ui/core";

export const useShareActionsModalStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            color: theme.palette.primary.main,
            "& .MuiIconButton-label": {
                "& svg": {
                    verticalAlign: "bottom",
                    height: "0.85em",
                },
            },
        },
    },
    dropdown: {
        padding: 0,
        position: 'absolute',
        width: 230,
        height: 208,
        top: 10,
        right: 50,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            padding: 0,
        },
        '& .MuiListItem-root': {
            height: 52,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.secondary.main,
            },
        },
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
    text: {
        fontSize: 15,
        fontWeight: 400,
    },
}));
