import { makeStyles, Theme } from "@material-ui/core";

interface TweetReplyIconButtonStylesProps {
    isUserCanReply?: boolean;
}

export const useTweetReplyIconButtonStyles = makeStyles<Theme, TweetReplyIconButtonStylesProps>((theme) => ({
    tweetIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isUserCanReply ? "rgb(185, 192, 197)" : theme.palette.text.secondary
            }
        }
    }
}));
