import {makeStyles, Theme} from "@material-ui/core";

export const useTweetImageStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        zIndex: 2,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.85)",
        cursor: "auto",
    },
    tweetImageModalImg: {
        position: "absolute",
        top: "50%",
        left: "40%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        maxHeight: "80%",
    },
    tweetImageModalContent: {

        backgroundColor: "white",
        width: 332,
        height: "100%",
        float: 'right',
    },
    tweetImageModalContentHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    tweetImageModalFooterContainer: {
        position: "absolute",
        left: "28%",
        width: 568,
        height: 48,
        bottom: 0,
        "& svg": {
            color: "#fff"
        },
    },
    tweetImageModalClose: {
        margin: 10,
        "& svg": {
            height: "0.9em",
            color: "#fff"
        },
    },
}));
