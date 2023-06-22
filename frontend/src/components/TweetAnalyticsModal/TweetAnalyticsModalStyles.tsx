import { makeStyles } from "@material-ui/core";

export const useTweetAnalyticsModalStyles = makeStyles((theme) => ({
    container: {
        "& .MuiDialogContent-root": {
            width: 597,
            height: 597,
            padding: 0
        }
    },
    tweetInfoContainer: {
        margin: "22px 12px"
    },
    tweetInfoWrapper: {
        padding: 12,
        border: `solid 1px ${theme.palette.divider}`,
        borderRadius: 4
    },
    tweetInfoFullName: {
        marginRight: 5
    },
    tweetInfoText: {
        "& a": {
            display: "block",
            width: 490,
            color: "inherit",
            textDecoration: "none"
        },
        "& #hashtag": {
            color: theme.palette.primary.main
        },
        "& #link": {
            color: theme.palette.primary.main
        }
    },
    analyticsInfoWrapper: {
        margin: "44px 0px 22px 0px"
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
        lineHeight: "18px"
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
        }
    },
    promoteWrapper: {
        margin: "22px 12px"
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
