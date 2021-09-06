import {makeStyles, Theme} from "@material-ui/core";

interface QuoteStylesProps {
    isTweetQuoted?: boolean,
    isFullTweet?: boolean,
}

export const useQuoteStyles = makeStyles<Theme, QuoteStylesProps>((theme) => ({
    quoteTweetLink: {
        textDecoration: "none",
        color: "#000",
    },
    quoteTweetContainer: {
        marginTop: 5,
        padding: 12,
        minHeight: 68,
        width: props => props.isFullTweet ? 560 : 504,
        marginLeft: props => props.isTweetQuoted ? 0 : 58,
        fontSize: 14,
        borderRadius: 16,
        border: "1px solid rgb(207, 217, 222)",
        '&:hover': {
            backgroundColor: 'rgb(243, 243, 243)',
        },
    },
    quoteTweetWrapper: {
        display: "flex",
        justifyContent: "flex-start",
    },
    quoteTweetAvatar: {
        marginRight: 3,
        maxWidth: "20px !important",
        maxHeight: "20px !important",
    },
    quoteTweetFullName: {
        fontWeight: 700,
        marginRight: 3,
    },
    quoteTweetUsername: {
        color: "rgb(83, 100, 113)",
    },
    quoteTweetText: {
        width: 490,
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
    },
}));
