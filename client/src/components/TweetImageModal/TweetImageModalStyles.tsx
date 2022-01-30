import {makeStyles, Theme} from "@material-ui/core";

interface TweetImageStylesProps {
    isUserCanReply: boolean;
    isTweetRetweeted: boolean;
    isTweetLiked: boolean;
}

export const useTweetImageStyles = makeStyles<Theme, TweetImageStylesProps>((theme) => ({
    container: {
        zIndex: 12,
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
        "& a": {
            cursor: "pointer",
            textDecoration: "none",
            color: theme.palette.text.primary,
            "&:hover": {
                "& #link": {
                    textDecoration: "underline",
                },
            },
        },
    },
    avatar: {
        marginRight: 15,
        margin: "12px 12px 16px 5px",
    },
    text: {
        fontWeight: 400,
        marginTop: 16,
        marginBottom: 16,
        wordBreak: 'break-word',
        '& #hashtag': {
            color: theme.palette.primary.main,
        },
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        margin: "16px 0",
        '& a': {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        },
        "& .MuiTypography-subtitle1": {
            marginLeft: 5,
        },
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
            "& svg" : {
                color: props => props.isUserCanReply ? "rgb(185, 192, 197)" : theme.palette.text.secondary,
            },
        },
    },
    retweetIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : theme.palette.text.secondary,
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
            },
            "&:hover": {
                backgroundColor: "rgba(249, 24, 128, 0.1) !important",
                "& svg": {
                    color: "rgb(224, 36, 94) !important",
                },
            },
        },
    },
    imageFooterIcon: {
        "& .MuiTypography-body1": {
            verticalAlign: "text-top",
        },
        "& .MuiIconButton-root": {
            "& svg": {
                color: theme.palette.common.white,
            },
            "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                "& svg": {
                    color: "rgb(255, 255, 255) !important",
                },
            },
        },
        "& span": {
            color: theme.palette.common.white,
        },
    },
    replyWrapper: {
        margin: "16px 68px",
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
