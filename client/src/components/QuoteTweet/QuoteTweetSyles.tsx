import {makeStyles, Theme} from "@material-ui/core";
import {Retweet} from "../../store/ducks/tweets/contracts/state";

interface QuoteTweetStyles {
    isTweetRetweetedByMe?: Retweet;
}

export const useQuoteTweetStyles = makeStyles<Theme, QuoteTweetStyles>((theme) => ({
    footerIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: props => props.isTweetRetweetedByMe ? "rgb(23, 191, 99)" : theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.80em",
            },
            "&:hover": {
                backgroundColor: "rgba(0, 186, 124, 0.1) !important",
                "& svg": {
                    color: "rgb(23, 191, 99) !important",
                },
            },
        },
        "& #retweets": {
            color: props => props.isTweetRetweetedByMe ? "rgb(23, 191, 99) !important" : theme.palette.text.secondary,
        },
    },
    dropdown: {
        padding: 0,
        position: 'absolute',
        width: 160,
        height: 104,
        top: 10,
        left: 20,
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
    },
    text: {
        fontSize: 15,
        fontWeight: 400,
    },
    textIcon: {
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
}));
