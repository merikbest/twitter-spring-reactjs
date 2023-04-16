import { makeStyles } from "@material-ui/core";

export const useFullTweetStyles = makeStyles((theme) => ({
    header: {
        justifyContent: "space-between",
        "& .MuiTypography-h5": {
            display: "inline-block",
            verticalAlign: "middle"
        }
    },
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        padding: "10px 22px 0px 22px"
    },
    tweetHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& a": {
            color: theme.palette.text.primary,
            textDecoration: "none"
        }
    },
    headerWrapper: {
        display: "flex"
    },
    headerUserInfo: {
        position: "relative",
        marginLeft: 15
    },
    dateWrapper: {
        marginBottom: 16
    },
    textWrapper: {
        fontWeight: 400,
        marginTop: 16,
        marginBottom: 16,
        wordBreak: "break-word",
        "& #hashtag": {
            color: theme.palette.primary.main
        },
        "& #mention": {
            color: theme.palette.primary.main
        },
        "& #link": {
            textDecoration: "none",
            color: theme.palette.primary.main
        }
    },
    image: {
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 564,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        }
    },
    content: {
        display: "flex",
        alignItems: "center",
        margin: "16px 0"
    },
    contentItem: {
        marginRight: 20,
        "& span": {
            marginLeft: 5
        }
    },
    interactionCount: {
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer"
        }
    },
    info: {
        display: "flex",
        position: "relative",
        paddingTop: 5,
        paddingBottom: 5,
        margin: "0 auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        left: 0,
        maxWidth: "100%",
        justifyContent: "space-around",
        padding: "2px 0",
        "& .MuiDivider-root": {
            color: "rgb(249, 243, 244)"
        }
    },
    replyInfoWrapper: {
        width: "100%",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0
    },
    replyInfo: {
        height: 72,
        backgroundColor: theme.palette.action.hover,
        margin: "16px 0px",
        borderRadius: 16,
        display: "flex"
    },
    iconWrapper: {
        padding: "20px 13px 16px 16px"
    },
    iconCircle: {
        marginRight: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
    },
    icon: {
        "& svg": {
            marginTop: 3,
            height: "1.2em",
            fill: theme.palette.common.white
        }
    },
    replyTextInfoWrapper: {
        marginTop: 15,
        "& .MuiTypography-h6": {
            fontWeight: 700
        }
    },
    replyWrapper: {
        margin: "16px 60px",
        "& a": {
            textDecoration: "none",
            color: theme.palette.primary.main
        }
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider
    }
}));
