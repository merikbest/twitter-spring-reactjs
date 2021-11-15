import {makeStyles, Theme} from "@material-ui/core";

interface UnsentTweetsModalStylesProps {
    visibleEditTweetModal: boolean;
}

export const useUnsentTweetsModalStyles = makeStyles<Theme, UnsentTweetsModalStylesProps>((theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
            borderBottom: props => props.visibleEditTweetModal ? "1px solid rgb(239, 243, 244)" : "1px solid transparent",
        },
    },
    outlinedButton: {
        marginLeft: "auto",
        marginRight: 12,
        "&.MuiButton-root": {
            padding: "4px 16px",
            border: 0,
            '&:hover': {
                border: 0,
            },
        },
    },
    containedButton: {
        marginLeft: "auto",
        "&.MuiButton-root": {
            padding: "4px 16px",
        },
    },
    content: {
        width: 598,
        overflowX: "hidden",
        padding: 0,
        minHeight: props => props.visibleEditTweetModal ? 220 : 600,
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
    loading: {
        marginTop: 50,
        textAlign: 'center',
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
    tweetContainer: {
        padding: "12px 16px",
        borderBottom: "1px solid rgb(239, 243, 244)",
        display: "flex",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgb(247, 249, 249)"
        },
    },
    tweetWrapper: {
        width: "100%"
    },
    tweetInfo: {
        display: "flex",
        justifyContent: "flex-start"
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
        marginLeft: "auto",
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
      padding: "4px 16px 20px 16px",
    },
    footer: {
        width: "100%",
        padding: 4,
        bottom: 0,
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid rgb(239, 243, 244)",
    },
    footerOutlinedButton: {
        "&.MuiButton-root": {
            padding: "4px 16px",
            border: 0,
            '&:hover': {
                border: 0,
            },
        },
    },
    footerDeleteButton: {
        "&.MuiButton-root": {
            color: "rgb(244, 33, 46)",
            padding: "4px 16px",
            border: 0,
            '&:hover': {
                backgroundColor: "rgba(244, 33, 46, 0.1)",
                border: 0,
            },
            "&.Mui-disabled": {
                color: "rgb(249, 144, 150)",
                border: "none",
            },
        },
    },
}));
