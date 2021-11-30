import {makeStyles, Theme} from "@material-ui/core";

export const useAccountAccessHistoryStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontWeight: 400,
        lineHeight: "16px",
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));
