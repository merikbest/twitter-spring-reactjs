import { makeStyles, Theme } from "@material-ui/core";

interface LargeLinkPreviewStylesProps {
    isFullTweet?: boolean;
}

export const useLargeLinkPreviewStyles = makeStyles<Theme, LargeLinkPreviewStylesProps>((theme) => ({
    container: {
        width: "100%",
        marginTop: 5,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.03)"
        },
        "& .MuiTypography-body1": {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden"
        },
        "& .MuiTypography-subtitle1": {
            marginTop: 5,
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            "& svg": {
                marginBottom: 2,
                marginRight: 3,
                verticalAlign: "bottom",
                fill: theme.palette.text.secondary,
                height: "1.10em"
            }
        }
    },
    linkCover: {
        borderRadius: "16px 16px 0px 0px",
        width: "100%"
    },
    siteLink: {
        color: "inherit",
        textDecoration: "none"
    },
    siteInfoWrapper: {
        padding: "3px 12px 12px 12px",
        lineHeight: "20px"
    }
}));
