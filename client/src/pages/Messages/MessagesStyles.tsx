import {makeStyles, Theme} from "@material-ui/core";

interface MessagesStylesProps {
    isUserBlocked: boolean;
}

export const useMessagesStyles = makeStyles<Theme, MessagesStylesProps>((theme) => ({
    grid: {
        padding: "12px 0px 0px 0px !important",
    },
    messagesContainer: {
        "& .MuiPaper-outlined": {
            padding: 0,
            borderRadius: 0,
            minHeight: '100vh',
            borderTop: 0,
            borderBottom: 0,
        },
    },
    header: {
        position: "fixed",
        display: 'flex',
        margin: 0,
        padding: 0,
        width: 416,
        height: 53,
        zIndex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        alignItems: 'center',
        flex: 1,
        '& .MuiTypography-h5': {
            marginLeft: 15,
        },
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
    messagesTitle: {
        paddingTop: 83,
        margin: "0px 30px",
    },
    messagesText: {
        margin: "8px 30px 27px 30px",
    },
    messagesButton: {
        marginLeft: 30,
        height: 52,
    },
    searchWrapper: {
        paddingTop: 60,
    },
    list: {
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.secondary.dark,
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
            },
        },
    },
    listItem: {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    userWrapper: {
        height: 76,
        borderTop: `1px solid ${theme.palette.divider}`,
        width: "100%",
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: 'pointer',
    },
    userAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 15,
    },
    username: {
        marginLeft: 5,
    },
    chatContainer: {
        minWidth: 600,
        "& .MuiPaper-outlined": {
            padding: 0,
            borderRadius: 0,
            minHeight: '100vh',
            borderLeft: 0,
            borderTop: 0,
            borderBottom: 0,
        },
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
        position: "fixed",
        display: 'flex',
        margin: 0,
        padding: 0,
        width: 598,
        height: 53,
        zIndex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        alignItems: 'center',
        flex: 1,
    },
    pageInfoWrapper: {
        paddingTop: 53
    },
    chatAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: 15,
    },
    chat: {
        padding: "53px 15px",
        height: 900,
        overflowY: "auto",
        borderBottom: 0
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
    participantMessageCommon: {
        marginTop: 10,
        "& .MuiTypography-root": {
            borderRadius: "16px 16px 16px 0px",
        },
    },
    participantMessageWithTweet: {
        "& .MuiTypography-root": {
            borderRadius: "0px 0px 16px 0px",
        },
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
    participantAvatar: {
        marginTop: "auto",
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 10,
    },
    participantMessageDate: {
        marginLeft: 50,
        marginTop: 5,
    },
    chatFooter: {
        display: 'flex',
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
    blockedInfoText: {
        textAlign: "center",
        height: 30,
    },
}));
