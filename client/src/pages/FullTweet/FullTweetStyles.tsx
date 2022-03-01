import {makeStyles, Theme} from "@material-ui/core";

interface FullTweetStyles {
    isTweetLiked: boolean;
    isTweetRetweeted: boolean;
}

export const useFullTweetStyles = makeStyles<Theme, FullTweetStyles>((theme) => ({
    container: {
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        padding: "10px 22px 0px 22px",
    },
    header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        '& a': {
            color: theme.palette.text.primary,
            textDecoration: 'none',
        },
    },
    headerWrapper: {
        display: 'flex',
    },
    headerUserInfo: {
        position: "relative",
        marginLeft: 15,
    },
    dateWrapper: {
        marginBottom: 16
    },
    textWrapper: {
        fontWeight: 400,
        marginTop: 16,
        marginBottom: 16,
        wordBreak: 'break-word',
        '& #hashtag': {
            color: theme.palette.primary.main,
        },
        "& #link": {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        }
    },
    image: {
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 564,
            borderRadius: 20,
            borderColor: theme.palette.info.light,
        },
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        margin: "16px 0",
        '& a': {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        },
    },
    contentItem: {
        marginRight: 20,
        "& span": {
            marginLeft: 5,
        },
    },
    info: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        margin: '0 auto',
        borderTop: `1px solid ${theme.palette.divider}`,
        left: 0,
        maxWidth: '100%',
        justifyContent: 'space-around',
        padding: '2px 0',
        "& .MuiDivider-root": {
            color: "rgb(249, 243, 244)",
        },
    },
    infoIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: theme.palette.text.secondary,
                width: "1.406rem",
                height: "1.406rem",
            },
        },
    },
    retweetIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : theme.palette.text.secondary,
                width: "1.406rem",
                height: "1.406rem",
            },
            "&:hover": {
                backgroundColor: "rgba(0, 186, 124, 0.1) !important",
                "& svg": {
                    color: "rgb(23, 191, 99) !important",
                },
            },
        },
    },
    likeIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary,
                width: "1.406rem",
                height: "1.406rem",
            },
            "&:hover": {
                backgroundColor: "rgba(249, 24, 128, 0.1) !important",
                "& svg": {
                    color: "rgb(224, 36, 94) !important",
                },
            },
        },
    },
    replyInfoWrapper: {
        width: "100%",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0
    },
    replyInfo: {
        height: 72,
        backgroundColor: "rgb(215, 246, 255)",
        margin: "16px 0px",
        borderRadius: 16,
        display: "flex",
    },
    iconWrapper: {
        padding: "20px 13px 16px 16px",
    },
    iconCircle: {
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        "& svg": {
            marginTop: 3,
            height: "1.2em",
            fill: theme.palette.common.white,
        },
    },
    replyTextInfoWrapper: {
        marginTop: 15,
        "& .MuiTypography-h6": {
            fontWeight: 700,
        },
    },
    replyWrapper: {
        margin: "16px 60px",
        "& a": {
            textDecoration: "none",
            color: theme.palette.primary.main,
        },
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider,
    },
    error: {
        width: 350,
        margin: "0 auto",
        paddingTop: 200,
        fontWeight: 700,
        textAlign: "center",
    },
}));
