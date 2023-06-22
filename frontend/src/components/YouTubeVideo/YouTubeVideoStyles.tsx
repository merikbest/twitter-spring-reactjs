import { makeStyles } from "@material-ui/core";

export const useYouTubeVideoStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        minHeight: 469,
        marginTop: 5,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
        "& iframe": {
            width: "100%",
            height: 378,
            borderRadius: "16px 16px 0px 0px"
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
                marginBottom: 3,
                marginRight: 3,
                verticalAlign: "bottom",
                fill: theme.palette.text.secondary,
                height: "1.10em"
            }
        }
    },
    youtubeLink: {
        color: "inherit",
        textDecoration: "none"
    },
    videoInfoWrapper: {
        padding: "3px 12px 12px 12px",
        lineHeight: "20px"
    }
}));
