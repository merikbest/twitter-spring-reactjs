import { makeStyles, Theme } from "@material-ui/core";

interface TweetImageStylesProps {
    // isUserCanReply: boolean;
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
        cursor: "auto"
    },
    modalWrapper: {
        backgroundColor: theme.palette.background.paper,
        width: 359,
        height: "100%",
        float: "right",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    imageModal: {
        position: "absolute",
        top: "50%",
        left: "40%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        maxHeight: "80%"
    },
    tweetInfo: {
        padding: "0 16px"
    },
    tweetFooter: {
        display: "flex",
        position: "relative",
        paddingTop: 5,
        paddingBottom: 5,
        margin: "0 auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        left: 0,
        maxWidth: "100%",
        justifyContent: "space-around",
        padding: "2px 0"
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider
    },
    imageFooterContainer: {
        position: "absolute",
        left: "28%",
        width: 568,
        height: 48,
        bottom: 0,
        "& svg": {
            color: theme.palette.common.white
        }
    },
    imageFooterWrapper: {
        display: "flex",
        position: "relative",
        paddingTop: 5,
        paddingBottom: 5,
        left: -13,
        justifyContent: "space-between",
        maxWidth: 450
    }
}));
