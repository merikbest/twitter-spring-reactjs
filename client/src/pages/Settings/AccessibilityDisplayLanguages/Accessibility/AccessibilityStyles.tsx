import {makeStyles, Theme} from "@material-ui/core";

export const useAccessibilityStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    infoItem: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
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
            marginTop: 8,
            float: "right",
            color: theme.palette.text.secondary,
            height: "1.4em"
        },
    },
    accessibilityInfo: {
        display: "inline-block",
        width: 200
    },
}));
