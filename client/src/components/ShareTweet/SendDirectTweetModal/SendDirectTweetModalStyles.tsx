import {makeStyles, Theme} from "@material-ui/core";

export const useSendDirectTweetModalStyles = makeStyles((theme: Theme) => ({
    header: {
        margin: 0,
        border: 0,
        "& svg": {
            fontSize: 26,
        },
    },
    headerMessage: {
        marginLeft: 15,
    },
    button: {
        marginLeft: "auto",
        height: 30,
    },
    content: {
        height: 550,
        width: 598,
        padding: 0,
        "& .MuiChip-root": {
            marginLeft: 8,
            backgroundColor: "#fff",
            border: "1px solid rgb(207, 217, 222)",
            "& .MuiChip-label": {
                fontSize: 15,
                fontWeight: 700,
            },
            "& .MuiChip-deleteIcon": {
                color: "rgb(29, 161, 242)"
            },
        },
    },
    divider: {
        marginTop: 8,
        height: 1,
        backgroundColor: "rgb(207, 217, 222)",
    },
    footer: {
        position: "absolute",
        padding: "4px 8px",
        minHeight: 56,
        width: "100%",
        borderTop: "3px solid rgb(239, 243, 244)",
        bottom: 0,
    },
    chatIcon: {
        marginLeft: 8,
        "& .MuiIconButton-root": {
            marginTop: 4,
            display: "inline",
            padding: 7,
            "& svg": {
                paddingTop: 2,
                height: "0.90em",
            },
        },
        "& .Mui-disabled": {
            marginTop: 4,
            display: "inline",
            padding: 7,
            "& svg": {
                color: "rgb(142, 205, 247)",
                paddingTop: 2,
                height: "0.90em",
            },
        },
    },
}));
