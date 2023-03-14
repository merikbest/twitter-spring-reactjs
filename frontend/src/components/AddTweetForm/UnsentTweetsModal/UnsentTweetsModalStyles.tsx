import { makeStyles, Theme } from "@material-ui/core";

interface UnsentTweetsModalStylesProps {
    visibleEditTweetModal: boolean;
}

export const useUnsentTweetsModalStyles = makeStyles<Theme, UnsentTweetsModalStylesProps>((theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
            borderBottom: props => props.visibleEditTweetModal ? `1px solid ${theme.palette.divider}` : "1px solid transparent",
            "& .MuiButtonBase-root": {
                marginLeft: "auto"
            }
        }
    },
    content: {
        width: 598,
        overflowX: "hidden",
        padding: 0,
        minHeight: props => props.visibleEditTweetModal ? 220 : 600
    },
    tweetContainer: {
        padding: "12px 16px",
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    },
    tweetWrapper: {
        width: "100%"
    },
    tweetInfo: {
        display: "flex",
        justifyContent: "flex-start"
    },
    imageWrapper: {
        width: 75,
        height: 75,
        marginLeft: "auto",
        "& img": {
            width: "100%"
        }
    },
    scheduledDateWrapper: {
        marginBottom: 10,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 12,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    },
    addTweetWrapper: {
        padding: "4px 16px 20px 16px"
    },
    footer: {
        width: "100%",
        padding: 4,
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        borderTop: `1px solid ${theme.palette.divider}`
    },
    footerDeleteButton: {
        "&.MuiButton-root": {
            color: theme.palette.error.main,
            "&:hover": {
                backgroundColor: "rgba(244, 33, 46, 0.1)"
            },
            "&.Mui-disabled": {
                color: "rgb(249, 144, 150)"
            }
        }
    }
}));
