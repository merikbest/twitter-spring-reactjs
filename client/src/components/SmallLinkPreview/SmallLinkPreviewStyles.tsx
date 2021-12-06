import {makeStyles, Theme} from "@material-ui/core";

interface SmallLinkPreviewStylesProps {
    linkCover: string;
    isFullTweet?: boolean;
}

export const useSmallLinkPreviewStyles = makeStyles<Theme, SmallLinkPreviewStylesProps>((theme) => ({
    container: {
        width: "100%",
        height: 129,
        marginTop: 5,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "flex-start",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.03)"
        }
    },
    siteLink: {
        color: "inherit",
        textDecoration: "none",
    },
    linkPreviewImage: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 129,
        height: 129,
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundImage: props => props.linkCover ? `url(${props.linkCover})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        borderRadius: "16px 0px 0px 16px",
    },
    videoIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height: 35,
        backgroundColor: theme.palette.primary.main,
        border: `4px solid ${theme.palette.common.white}`,
        borderRadius: "50%",
        "& svg": {
            marginLeft: 2,
            fill: theme.palette.common.white,
            height: "1.10em",
        },
    },
    linkIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height: 35,
        backgroundColor: theme.palette.primary.main,
        border: `4px solid ${theme.palette.common.white}`,
        borderRadius: "50%",
        "& svg": {
            marginLeft: 2,
            fill: theme.palette.common.white,
            height: "1.10em",
        },
    },
    linkPreviewTitle: {
        fontSize: 15,
        lineHeight: "18px",
        padding: 12,
        marginTop: "auto",
        marginBottom: "auto",
        width: "100%",
        maxWidth: props => props.isFullTweet ? 428 : 370,
        height: 103,
        display: "inline-block",
    },
    linkTitle: {
        fontSize: 15,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    linkDescription: {
        marginTop: 3,
        fontSize: 15,
        lineHeight: "18px",
        color: theme.palette.text.secondary,
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": 2,
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    link: {
        marginTop: 3,
        height: 40,
        fontSize: 15,
        color: theme.palette.text.secondary,
        "& svg": {
            marginBottom: 2,
            marginRight: 3,
            verticalAlign: "bottom",
            fill: theme.palette.text.secondary,
            height: "1.10em",
        },
    },
}));
