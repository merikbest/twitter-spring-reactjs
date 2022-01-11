import {makeStyles, Theme} from "@material-ui/core";

export const useLanguagesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    accessibilityWrapper: {
        textDecoration: "none",
    },
    accessibilityLink: {
        padding: "12px 16px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer"
        },
        "& svg": {
            float: "right",
            color: theme.palette.text.secondary,
            height: "1.4em"
        },
    },
    accessibilityInfo: {
        display: "inline-block",
    },
}));
