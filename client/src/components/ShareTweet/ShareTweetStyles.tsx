import {makeStyles, Theme} from "@material-ui/core";

export const useShareTweetModalStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        "& .MuiIconButton-root": {
            padding: 7,
            color: "rgb(83, 100, 113)",
            "& .MuiIconButton-label": {
                "& svg": {
                    verticalAlign: "bottom",
                    height: (props: { isFullTweet: boolean }) => props.isFullTweet ? "0.90em" : "0.80em",
                },
            },
        },
    },
    dropdown: {
        padding: 0,
        position: 'absolute',
        width: 280,
        height: 208,
        top: 10,
        right: 10,
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
                backgroundColor: 'rgb(247, 249, 249)',
            },
        },
    },
    text: {
        fontSize: 15,
        fontWeight: 400,
    },
    textIcon: {
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: "rgb(83, 100, 113)",
            height: "1.30em",
        },
    },
}));
