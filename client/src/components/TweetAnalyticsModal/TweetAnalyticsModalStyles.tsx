import {makeStyles, Theme} from "@material-ui/core";

export const useTweetAnalyticsModalStyles = makeStyles<Theme>((theme) => ({
    container: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            margin: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDialogContent-root": {
            width: 597,
            height: 597,
            padding: 0
        },
    },
    tweetInfoContainer: {
        margin: "22px 12px",
        // borderRadius: 4,
    },
    tweetInfoWrapper: {
        padding: 12,
        border: "solid 1px #e1e8ed",
        borderRadius: 4,
    },
    tweetInfoFullName: {
        fontSize: 14,
        fontWeight: 700,
        marginRight: 5,
    },
    tweetInfoUsername: {
        color: "#8899a6",
        fontSize: 13,
    },
    tweetInfoText: {
        fontSize: 14,
        lineHeight: "18px"
    },
    analyticsInfoWrapper: {
        margin: "44px 0px 22px 0px",
    },
    analyticsInfoTitle: {
        fontSize: 18,
        fontWeight: 500,
        lineHeight: "18px"
    },
    analyticsInfoText: {
        fontWeight: 400,
        fontSize: 14,
        color: "#8899a6",
        marginTop: 2,
        lineHeight: "18px",
    },
    impressionsCount: {
        float: "right"
    },
    engagementsWrapper: {
        paddingTop: 30
    },
    engagementsButton: {
        "& .MuiButton-root": {
            borderRadius: 5
        },
    },
    promoteWrapper: {
        margin: "22px 12px",
    },
    promoteImage: {
        display: "block",
        margin: "0px auto",
        width: 40
    },
    promoteTitle: {
        textAlign: "center",
        fontSize: 21,
        lineHeight: "28px"
    },
    promoteText: {
        textAlign: "center",
        color: "#8899a6",
        fontSize: 14,
        lineHeight: "15px",
        marginTop: 2
    }
}));
