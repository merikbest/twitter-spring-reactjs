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
        color: "rgb(83, 100, 113)",
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
            borderRight: "2px solid rgb(27, 149, 224)",
            backgroundColor: "#fff",
        },
    },
    listItem: {
        padding: 0,
        backgroundColor: "#fff",
        "& :hover": {
            backgroundColor: '#edf3f6',
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
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        fontSize: 15,
    },
    username: {
        marginLeft: 5,
        display: "inline-block",
        color: "rgb(83, 100, 113)",
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
        color: "rgb(83, 100, 113)",
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
                "& svg" : {
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
                "& svg" : {
                    height: "0.82em",
                }
            },
        },
    },
}));
