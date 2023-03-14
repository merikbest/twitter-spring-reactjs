import { makeStyles, Theme } from "@material-ui/core";

interface TweetRetweetedIconButtonStylesProps {
    isTweetRetweeted?: boolean;
}

export const useTweetRetweetedIconButtonStyles = makeStyles<Theme, TweetRetweetedIconButtonStylesProps>((theme) => ({
    retweetIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : theme.palette.text.secondary
            },
            "&:hover": {
                backgroundColor: "rgba(0, 186, 124, 0.1) !important",
                "& svg": {
                    color: "rgb(23, 191, 99) !important"
                }
            }
        }
    }
}));
