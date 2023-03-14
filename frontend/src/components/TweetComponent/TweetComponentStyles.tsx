import { makeStyles, Theme } from "@material-ui/core";

interface TweetComponentStylesProps {
    isTweetImageModal?: boolean;
}

export const useTweetComponentStyles = makeStyles<Theme, TweetComponentStylesProps>((theme) => ({
    container: {
        position: "relative",
        cursor: "pointer",
        paddingTop: 12,
        paddingLeft: 20,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    tweetWrapper: {
        display: "flex",
        alignItems: "flex-start",
        flex: 1
    },
    tweetContainer: {
        flex: 1,
        marginLeft: 15,
        width: props => props.isTweetImageModal ? 263 : 0
    },
    headerWrapper: {
        color: "inherit",
        textDecoration: "none",
        "& #hashtag": {
            color: theme.palette.primary.main
        }
    },
    header: {
        position: "relative",
        display: "flex",
        height: 20,
        justifyContent: "space-between",
        "& .MuiTypography-h6": {
            fontWeight: 700
        }
    },
    headerIcon: {
        padding: 0,
        marginRight: 12,
        "& svg": {
            color: theme.palette.text.secondary,
            height: "0.8em"
        }
    },
    tweetContent: {
        width: 500
    },
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 252,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        },
        "& .small": {
            width: 260
        }
    },
    footer: {
        display: "flex",
        position: "relative",
        paddingTop: 5,
        paddingBottom: 5,
        left: -8,
        justifyContent: "space-between",
        maxWidth: 450
    },
    popperUserWindow: {
        position: "absolute",
        width: 100,
        height: 100,
        border: "1px solid black",
        backgroundColor: theme.palette.common.white
    }
}));
