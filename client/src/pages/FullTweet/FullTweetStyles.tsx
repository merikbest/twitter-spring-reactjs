import {makeStyles, Theme} from "@material-ui/core";
import {LikeTweet, Retweet} from "../../store/ducks/tweets/contracts/state";

interface FullTweetStyles {
    isTweetLiked?: LikeTweet;
    isTweetRetweeted?: Retweet;
}

export const useFullTweetStyles = makeStyles<Theme, FullTweetStyles>((theme) => ({
    retweetWrapper: {
        display: "flex",
        alignItems: "center",
        marginLeft: 20,
        marginTop: 5,
        color: "rgb(83, 100, 113)",
        '& p': {
            marginLeft: 15,
            fontSize: 14,
            fontWeight: 700
        },
        "& svg": {
            verticalAlign: "bottom",
            height: "1.20em",
        },
    },
    loading: {
        marginTop: 50,
        textAlign: 'center',
    },
    container: {
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        padding: "10px 22px 0px 22px",
    },
    header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        '& a': {
            color: "#000",
            textDecoration: 'none',
        },
    },
    headerWrapper: {
        display: 'flex',
    },
    avatar: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
        marginRight: 15,
    },
    username: {
        color: "rgb(83, 100, 113)",
    },
    date: {
        color: "rgb(83, 100, 113)",
    },
    textWrapper: {
        fontSize: 24,
        marginTop: 16,
        marginBottom: 16,
        lineHeight: 1.3125,
        wordBreak: 'break-word',
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
        "& #link": {
            textDecoration: 'none',
            color: "rgb(27, 149, 224)",
        }
    },
    image: {
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 564,
            borderRadius: 20,
            borderColor: "#5b7083",
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
        color: "rgb(83, 100, 113)",
    },
    info: {
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
        "& .MuiDivider-root": {
            color: "rgb(249, 243, 244)",
        },
    },
    infoIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: "rgb(83, 100, 113)",
                verticalAlign: "bottom",
                height: "0.9em",
            },
        },
    },
    retweetIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : "rgb(83, 100, 113)",
                verticalAlign: "bottom",
                height: "0.9em",
            }
        },
    },
    likeIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : "rgb(83, 100, 113)",
                verticalAlign: "bottom",
                height: "0.9em",
            }
        },
    },
    replyInfoWrapper: {
        width: "100%",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0
    },
    replyInfo: {
        height: 72,
        backgroundColor: "rgb(215, 246, 255)",
        margin: "16px 0px",
        borderRadius: 16,
        display: "flex",
    },
    iconWrapper: {
        padding: "20px 13px 16px 16px",
    },
    iconCircle: {
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: "rgb(29, 155, 240)",
    },
    icon: {
        "& svg": {
            marginTop: 3,
            height: "1.2em",
            fill: "#fff",
        },
    },
    replyTextInfoWrapper: {
        marginTop: 15,
        fontSize: 15,
    },
    replyInfoTitle: {
        fontWeight: 700,
    },
    replyInfoText: {
        fontWeight: 400,
    },
    replyWrapper: {
        margin: "16px 60px",
        color: "rgb(83, 100, 113)",
        fontSize: 15,
        "& a": {
            textDecoration: "none",
            color: "rgb(27, 149, 224)",
        },
    },
    divider: {
        height: 12,
        backgroundColor: '#E6ECF0',
    },
}));
