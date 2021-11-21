import {makeStyles, Theme} from "@material-ui/core";
import {LikeTweet} from "../../store/ducks/tweets/contracts/state";

interface TweetComponentStylesProps {
    isTweetLiked?: LikeTweet;
    isUserCanReply: boolean;
}

export const useTweetComponentStyles = makeStyles<Theme, TweetComponentStylesProps>((theme) => ({
    container: {
        position: "relative",
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingLeft: 20,
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },
        '& h6': {
            fontWeight: 800,
        },
    },
    avatar: {
        width: "46px !important",
        height: "46px !important",
        marginRight: 15,
    },
    headerWrapper: {
        color: 'inherit',
        textDecoration: 'none',
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
    },
    header: {
        position: "relative",
        display: 'flex',
        height: 20,
        justifyContent: 'space-between',
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    headerText: {
        color: 'rgb(83, 100, 113)',
    },
    headerIcon: {
        padding: 0,
        marginRight: 12,
        "& svg": {
            color: "rgb(83, 100, 113)",
            height: "0.8em",
        },
    },
    replyWrapper: {
        zIndex: 2,
        fontSize: 15,
        color: "#5b7083",
    },
    replyLink: {
        textDecoration: "none",
        color: "rgb(27, 149, 224)",
    },
    text: {
        "& a": {
            display: "block",
            width: 490,
            color: 'inherit',
            textDecoration: 'none',
        },
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
        "& #link": {
            color: "rgb(27, 149, 224)",
        }
    },
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 252,
            borderRadius: 20,
            borderColor: "#5b7083",
        },
        "& .small": {
            width: 260,
        },
    },
    iconWrapper: {
        display: "inline-block",
        marginTop: 8,
        marginBottom: 4,
    },
    iconCircle: {
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: "rgb(29, 155, 240)",
    },
    icon: {
        "& svg": {
            height: "0.75em",
            fill: "#fff",
        },
    },
    replyText: {
        display: "inline-block",
        color: "rgb(83, 100, 113)",
        fontSize: 13,
    },
    footer: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        left: -8,
        justifyContent: 'space-between',
        maxWidth: 450,
    },
    replyIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: props => props.isUserCanReply ? "rgb(185, 192, 197)" : "rgb(83, 100, 113)",
                verticalAlign: "bottom",
                height: "0.80em",
            },
        },
        "& span": {
            color: props => props.isUserCanReply ? "rgb(224, 36, 94)" : "rgb(83, 100, 113)",
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
        "& span": {
            color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : "rgb(83, 100, 113)",
        },
    },
    bottomLine: {
        height: 12,
        backgroundColor: '#E6ECF0',
    },
    retweetWrapper: {
        display: "flex",
        alignItems: "center",
        marginLeft: 45,
        marginTop: 5,
        color: "#5b7083",
        "& svg": {
            verticalAlign: "bottom",
            height: "1.20em",
        },
        "& p": {
            marginLeft: 15,
            fontSize: 14,
            fontWeight: 700
        },
    },
    popperUserWindow: {
        position: "absolute",
        width: 100,
        height: 100,
        border: "1px solid black",
        backgroundColor: "#fff",
    },
}));
