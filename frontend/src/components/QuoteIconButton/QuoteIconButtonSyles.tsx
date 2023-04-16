import { makeStyles, Theme } from "@material-ui/core";

interface QuoteTweetStyles {
    isTweetRetweetedByMe?: boolean;
}

export const useQuoteIconButtonStyles = makeStyles<Theme, QuoteTweetStyles>((theme) => ({
    footerIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetRetweetedByMe ? "rgb(23, 191, 99)" : theme.palette.text.secondary
            },
            "&:hover": {
                backgroundColor: "rgba(0, 186, 124, 0.1) !important",
                "& svg": {
                    color: "rgb(23, 191, 99) !important"
                }
            }
        },
        "& #retweets": {
            verticalAlign: "middle",
            color: props => props.isTweetRetweetedByMe ? "rgb(23, 191, 99)" : theme.palette.text.secondary
        }
    },
    dropdown: {
        padding: 0,
        position: "absolute",
        width: 160,
        height: 104,
        top: 10,
        left: 20,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiListItem-root": {
            height: 52,
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            },
            "& svg": {
                marginRight: 15
            }
        }
    },
    retweetsCount: {
        position: "absolute",
        marginTop: 7
    }
}));
