import {makeStyles, Theme} from "@material-ui/core";

export const useMessagesStyles = makeStyles((theme: Theme) => ({
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
        '& h6': {
            marginLeft: 15,
            fontWeight: 800,
        },
        "& svg": {
            marginRight: 20
        },
    },
    messagesTitle: {
        paddingTop: 83,
        lineHeight: 1.1,
        fontSize: 29,
        fontWeight: 800,
        margin: "0px 30px",
    },
    messagesText: {
        fontSize: 14,
        color: theme.palette.text.secondary,
        margin: "8px 30px 27px 30px",
    },
    messagesButton: {
        marginLeft: 30,
        height: 48,
        padding: theme.spacing(3.2),
        "& .MuiButton-label": {
            fontSize: 15,
        },
    },
    searchWrapper: {
        paddingTop: 60,
    },
    list: {
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.common.white,
        },
    },
    listItem: {
        padding: 0,
        backgroundColor: theme.palette.common.white,
        "& :hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    userWrapper: {
        height: 76,
        borderTop: "1px solid #EFF3F4",
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
    userHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userFullName: {
        display: "inline-block",
        color: theme.palette.text.primary,
        fontWeight: 800,
        fontSize: 15,
    },
    username: {
        marginLeft: 5,
        display: "inline-block",
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
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
    chatInfoTitle: {
        lineHeight: 1.1,
        fontSize: 29,
        fontWeight: 800,
    },
    chatInfoText: {
        fontSize: 14,
        color: theme.palette.text.secondary,
        margin: "8px 0px 27px 0px",
    },
    chatInfoButton: {
        height: 48,
        padding: theme.spacing(3.2),
        "& .MuiButton-label": {
            fontSize: 15,
        },
    },
    chatHeader: {
        position: "fixed",
        display: 'flex',
        margin: 0,
        padding: 0,
        paddingLeft: 15,
        width: 598,
        height: 53,
        zIndex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: "1px solid #EFF3F4",
        borderRadius: 0,
        alignItems: 'center',
        flex: 1,
        '& h6': {
            fontWeight: 800,
        },
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
    },
    tweetUserFullName: {
        marginLeft: 3,
        fontWeight: 700,
        fontSize: 15,
    },
    tweetUsername: {
        marginLeft: 3,
        color: theme.palette.text.secondary,
        fontSize: 15,
    },
    myMessage: {
        display: "flex",
        flexDirection: "row-reverse",
        "& span": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: "11px 15px",
            maxWidth: 384,
        },
    },
    myMessageCommon: {
        marginTop: 10,
        "& span": {
            borderRadius: "16px 16px 0px 16px",
        },
    },
    myMessageWithTweet: {
        "& span": {
            borderRadius: "0px 0px 0px 16px",
        },
    },
    myMessageDate: {
        fontSize: 12,
        display: "flex",
        flexDirection: "row-reverse",
        marginTop: 5,
        color: theme.palette.text.secondary,
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
    },
    participantTweetFullName: {
        marginLeft: 3,
        fontWeight: 700,
        fontSize: 15,
    },
    participantTweetUsername: {
        marginLeft: 3,
        color: theme.palette.text.secondary,
        fontSize: 15,
    },
    participantMessageCommon: {
        marginTop: 10,
        "& span": {
            borderRadius: "16px 16px 16px 0px",
        },
    },
    participantMessageWithTweet: {
        "& span": {
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
        fontSize: 12,
        marginLeft: 50,
        marginTop: 5,
        color: theme.palette.text.secondary,
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
}));
