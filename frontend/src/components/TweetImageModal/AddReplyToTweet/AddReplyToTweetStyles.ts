import { makeStyles } from "@material-ui/core";

export const useAddReplyToTweetStyles = makeStyles((theme) => ({
    replyWrapper: {
        margin: "16px 68px",
        "& a": {
            textDecoration: "none",
            color: theme.palette.primary.main
        }
    }
}));
