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
        backgroundColor: "white",
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
    avatar: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
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
            color: "rgb(27, 149, 224)",
        },
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        margin: "16px 0",
        fontSize: 15,
        '& a': {
            color: "#000",
            textDecoration: 'none'
        },
    },
    contentItem: {
        marginLeft: 5,
        color: "rgb(83, 100, 113)"
    },
    tweetFooter: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        margin: '0 auto',
        borderTop: '1px solid #E6ECF0',
        left: 0,
        maxWidth: '100%',
        justifyContent: 'space-around',
        padding: '2px 0',
    },
    tweetIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: "rgb(83, 100, 113)",
                verticalAlign: "bottom",
                height: "0.80em",
            }
        },
    },
    retweetIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : "rgb(83, 100, 113)",
                verticalAlign: "bottom",
                height: "0.80em",
            }
        },
    },
    likeIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : "rgb(83, 100, 113)",
                verticalAlign: "bottom",
                height: "0.80em",
            },
        },
    },
    imageFooterIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: "#ffffff",
                verticalAlign: "bottom",
                height: "0.80em",
            }
        },
        "& span": {
            color: "#ffffff",
        },
    },
    replyWrapper: {
        margin: "16px 68px",
        color: "rgb(83, 100, 113)",
        fontSize: 15,
        "& a": {
            textDecoration: "none",
            color: "rgb(27, 149, 224)",
        },
    },
    divider: {
        height: 12,
        backgroundColor: '#F7F9F9',
    },
    imageFooterContainer: {
        position: "absolute",
        left: "28%",
        width: 568,
        height: 48,
        bottom: 0,
        "& svg": {
            color: "#fff"
        },
    },
    grey: {
        color: "rgb(83, 100, 113)",
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
            color: "#fff"
        },
    },
}));
