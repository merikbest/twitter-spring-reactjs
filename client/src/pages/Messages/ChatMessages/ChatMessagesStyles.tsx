import {makeStyles, Theme} from "@material-ui/core";

export const useChatMessagesStyles = makeStyles((theme: Theme) => ({
    chatContainer: {
        minWidth: 600,
        padding: 0,
        borderLeft: 0,
    },
    chatInfoWrapper: {
        width: 320,
        margin: "0px auto",
        paddingTop: 300,
    },
    chatInfoButton: {
        marginTop: 27,
        height: 52,
    },
    chatHeader: {
        width: 598,
    },
    chatAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        margin: "0px 15px",
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
    icon: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: theme.palette.primary.main,
                verticalAlign: "bottom",
                height: "0.90em",
            },
        },
    },
    chat: {
        padding: "53px 15px",
        height: 900,
        overflowY: "auto",
        border: 0,
    },
    tweetContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row-reverse",
        "& a": {
            color: "inherit",
            textDecoration: "none",
        },
    },
    tweetWrapper: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "16px 16px 0px 16px",
        padding: 12,
        width: 384,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main,
        },
    },
    tweetUserInfoWrapper: {
        display: "flex",
    },
    tweetAvatar: {
        width: "18px !important",
        height: "18px !important",
        marginRight: 3,
    },
    tweetUsername: {
        marginLeft: 3,
    },
    myMessage: {
        display: "flex",
        flexDirection: "row-reverse",
        "& .MuiTypography-root": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: "11px 15px",
            maxWidth: 384,
        },
    },
    myMessageCommon: {
        marginTop: 10,
        "& .MuiTypography-root": {
            borderRadius: "16px 16px 0px 16px",
        },
    },
    myMessageWithTweet: {
        "& .MuiTypography-root": {
            borderRadius: "0px 0px 0px 16px",
        },
    },
    myMessageDate: {
        display: "flex",
        flexDirection: "row-reverse",
        marginTop: 5,
        "& svg": {
            marginLeft: 5,
            height: "1.2em",
            color: theme.palette.primary.main
        },
    },
    participantContainer: {
        display: "flex",
        flexDirection: "row",
    },
    participantAvatar: {
        marginTop: "auto",
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 10,
    },
    participantTweetContainer: {
        marginTop: 10,
        display: "flex",
        alignItems: "flex-start",
        "& a": {
            color: "inherit",
            textDecoration: "none"
        },
    },
    participantTweetWrapper: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "16px 16px 16px 0px",
        padding: 12,
        width: 384,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgb(247, 249, 249)"
        },
    },
    participantTweetInfoWrapper: {
        display: "flex",
    },
    participantTweetAvatar: {
        width: "18px !important",
        height: "18px !important",
        marginRight: 3,
    },
    participantTweetUsername: {
        marginLeft: 3,
    },
    participantMessage: {
        display: "flex",
        alignItems: "flex-start",
        "& span": {
            backgroundColor: theme.palette.divider,
            padding: "11px 16px",
            maxWidth: 384,
        },
    },
    participantMessageWithTweet: {
        "& .MuiTypography-root": {
            borderRadius: "0px 0px 16px 0px",
        },
    },
    participantMessageCommon: {
        marginTop: 10,
        "& .MuiTypography-root": {
            borderRadius: "16px 16px 16px 0px",
        },
    },
    participantMessageDate: {
        marginLeft: 50,
        marginTop: 5,
    },
    blockedInfoText: {
        textAlign: "center",
        height: 30,
    },
    chatFooter: {
        display: 'flex',
        alignItems: "center",
        position: 'fixed',
        bottom: 3,
        width: 598,
        padding: 4,
        borderRight: 0,
        borderLeft: 0,
        borderBottom: 0,
    },
    chatIcon: {
        "& .MuiIconButton-root": {
            width: 30,
            height: 30,
            "& span": {
                paddingTop: 2,
                "& svg": {
                    height: "0.82em",
                }
            },
        },
    },
    emojiIcon: {
        position: "absolute",
        right: 50,
        paddingTop: 5,
        "& .MuiIconButton-root": {
            width: 30,
            height: 30,
            "& span": {

                "& svg": {
                    height: "0.82em",
                }
            },
        },
    },
}));
