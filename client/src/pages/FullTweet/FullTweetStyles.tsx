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
        color: theme.palette.text.secondary,
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
            color: theme.palette.text.primary,
            textDecoration: 'none',
        },
    },
    headerWrapper: {
        display: 'flex',
    },
    avatar: {
        width: "46px !important",
        height: "46px !important",
        marginRight: 15,
    },
    headerUserInfo: {
        position: "relative",
        fontSize: 15,
        "& b": {
            lineHeight: "20px"
        },
    },
    username: {
        color: theme.palette.text.secondary,
        lineHeight: "20px"
    },
    date: {
        color: theme.palette.text.secondary,
    },
    dateWrapper: {
        marginBottom: 16
    },
    textWrapper: {
        fontSize: 24,
        marginTop: 16,
        marginBottom: 16,
        lineHeight: 1.3125,
        wordBreak: 'break-word',
        '& #hashtag': {
            color: theme.palette.primary.main,
        },
        "& #link": {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        }
    },
    image: {
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 564,
            borderRadius: 20,
            borderColor: theme.palette.info.light,
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
        marginRight: 20,
        "& span": {
            marginLeft: 5,
            color: theme.palette.text.secondary,
        },
    },
    info: {
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
        "& .MuiDivider-root": {
            color: "rgb(249, 243, 244)",
        },
    },
    infoIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.9em",
            },
        },
    },
    retweetIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.9em",
            },
            "&:hover": {
                backgroundColor: "rgba(0, 186, 124, 0.1) !important",
                "& svg": {
                    color: "rgb(23, 191, 99) !important",
                },
            },
        },
    },
    likeIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.9em",
            },
            "&:hover": {
                backgroundColor: "rgba(249, 24, 128, 0.1) !important",
                "& svg": {
                    color: "rgb(224, 36, 94) !important",
                },
            },
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
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        "& svg": {
            marginTop: 3,
            height: "1.2em",
            fill: theme.palette.common.white,
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
    error: {
        width: 350,
        margin: "0 auto",
        paddingTop: 200,
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center",
    },
}));
