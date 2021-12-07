import {makeStyles, Theme} from "@material-ui/core";
import {LikeTweet, Retweet} from "../../store/ducks/tweets/contracts/state";

interface TweetImageStylesProps {
    isTweetRetweeted?: Retweet;
    isTweetLiked?: LikeTweet;
}

export const useTweetImageStyles = makeStyles<Theme, TweetImageStylesProps>((theme) => ({
    container: {
        zIndex: 2,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.85)",
        cursor: "auto",
    },
    modalWrapper: {
        backgroundColor: theme.palette.background.paper,
        width: 359,
        height: "100%",
        float: 'right',
        overflowY: "scroll",
        overflowX: "hidden",
    },
    imageModal: {
        position: "absolute",
        top: "50%",
        left: "40%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        maxHeight: "80%",
    },
    tweetInfo: {
        padding: "0 16px",
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        cursor: "pointer",
        textDecoration: "none",
        color: theme.palette.text.primary,
        "&:hover": {
            "& #link": {
                textDecoration: "underline",
            },
        },
    },
    avatar: {
        width: "46px !important",
        height: "46px !important",
        marginRight: 15,
        margin: "12px 12px 16px 5px",
    },
    text: {
        fontSize: 24,
        marginTop: 16,
        marginBottom: 16,
        lineHeight: 1.3125,
        wordBreak: 'break-word',
        '& #hashtag': {
            color: theme.palette.primary.main,
        },
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        margin: "16px 0",
        fontSize: 15,
        '& a': {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        },
    },
    contentItem: {
        marginLeft: 5,
        color: theme.palette.text.secondary,
    },
    tweetFooter: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        margin: '0 auto',
        borderTop: `1px solid ${theme.palette.divider}`,
        left: 0,
        maxWidth: '100%',
        justifyContent: 'space-around',
        padding: '2px 0',
    },
    tweetIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.80em",
            }
        },
    },
    retweetIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.80em",
            }
        },
    },
    likeIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.80em",
            },
        },
    },
    imageFooterIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: theme.palette.common.white,
                verticalAlign: "bottom",
                height: "0.80em",
            }
        },
        "& span": {
            color: theme.palette.common.white,
        },
    },
    replyWrapper: {
        margin: "16px 68px",
        color: theme.palette.text.secondary,
        fontSize: 15,
        "& a": {
            textDecoration: "none",
            color: theme.palette.primary.main,
        },
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider,
    },
    imageFooterContainer: {
        position: "absolute",
        left: "28%",
        width: 568,
        height: 48,
        bottom: 0,
        "& svg": {
            color: theme.palette.common.white
        },
    },
    grey: {
        color: theme.palette.text.secondary,
    },
    imageFooterWrapper: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        left: -13,
        justifyContent: 'space-between',
        maxWidth: 450,
    },
    imageModalClose: {
        margin: 10,
        "& svg": {
            height: "0.9em",
            color: theme.palette.common.white
        },
    },
}));
