import {makeStyles, Theme} from "@material-ui/core";

interface UnsentTweetsModalStylesProps {
    visibleEditTweetModal: boolean;
}

export const useUnsentTweetsModalStyles = makeStyles<Theme, UnsentTweetsModalStylesProps>((theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
            borderBottom: props => props.visibleEditTweetModal ? "1px solid rgb(239, 243, 244)" : "1px solid transparent",
            "& .MuiIconButton-root": {
                marginRight: 15,
            },
        },
    },
    content: {
        width: 598,
        overflowX: "hidden",
        padding: 0,
        minHeight: props => props.visibleEditTweetModal ? 300 : 600,
    },
    tabs: {
        borderBottom: "1px solid rgb(239, 243, 244)",
        "& .MuiTabs-indicator": {
            marginLeft: 105,
            maxWidth: 90,
            height: 4,
            backgroundColor: "rgb(29, 161, 242)",
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    tab: {
        minWidth: 299,
        textTransform: 'none',
    },
    infoWrapper: {
        margin: "32px auto",
        width: 336,
    },
    title: {
        fontSize: 31,
        fontWeight: 800,
        textAlign: "center",
        lineHeight: "36px",
        color: "rgb(15, 20, 25)",
        marginBottom: 8
    },
    text: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: "20px",
        textAlign: "center",
        color: "rgb(83, 100, 113)",
    },
    tweetWrapper: {
        padding: "12px 16px",
        borderBottom: "1px solid rgb(239, 243, 244)",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgb(247, 249, 249)"
        },
    },
    tweetInfo: {
        display: "flex",
        justifyContent: "space-between"
    },
    tweetText: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: "20px",
        color: "rgb(15, 20, 25)",
    },
    imageWrapper: {
        width: 75,
        height: 75,
        "& img": {
            width: "100%",
        },
    },
    scheduledDateWrapper: {
        marginBottom: 10,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 12,
            fill: "rgb(83, 100, 113)",
            height: "1.30em",
        },
    },
    scheduledDateText: {
        fontSize: 13,
        fontWeight: 400,
        lineHeight: "16px",
        color: "rgb(83, 100, 113)",
    },
    addTweetWrapper: {
      padding: "4px 16px",
    },
}));
