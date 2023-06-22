import { makeStyles } from "@material-ui/core";

export const useUnsentTweetItemStyles = makeStyles((theme) => ({
    tweetContainer: {
        padding: "12px 16px",
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    },
    tweetWrapper: {
        width: "100%"
    },
    tweetInfo: {
        display: "flex",
        justifyContent: "flex-start"
    },
    imageWrapper: {
        width: 75,
        height: 75,
        marginLeft: "auto",
        "& img": {
            width: "100%"
        }
    },
    scheduledDateWrapper: {
        marginBottom: 10,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 12,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    }
}));
