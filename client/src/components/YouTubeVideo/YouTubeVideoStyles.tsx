import {makeStyles, Theme} from "@material-ui/core";

export const useYouTubeVideoStyles = makeStyles<Theme>((theme) => ({
    container: {
        width: "100%",
        minHeight: 469,
        marginTop: 5,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
        "& iframe": {
            width: "100%",
            height: 378,
            borderRadius: "16px 16px 0px 0px",
        },
    },
    youtubeLink: {
        color: "inherit",
        textDecoration: "none",
    },
    videoInfoWrapper: {
        padding: "3px 12px 12px 12px",
        lineHeight: "20px"
    },
    videoInfoTitle:{
        fontSize: 15,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    videoInfoDescription:{
        fontSize: 15,
        color: theme.palette.text.secondary,
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": 2,
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    youtubeTitle: {
        marginTop: 5,
        height: 40,
        fontSize: 15,
        color: theme.palette.text.secondary,
        "& svg": {
            marginBottom: 3,
            marginRight: 3,
            verticalAlign: "bottom",
            fill: theme.palette.text.secondary,
            height: "1.10em",
        },
    },
}));
