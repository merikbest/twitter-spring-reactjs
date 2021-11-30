import {makeStyles, Theme} from "@material-ui/core";

export const useMutedWordsStyles = makeStyles((theme: Theme) => ({
    mutedWordsInfo: {
        margin: "32px auto",
        width: 336,
        textAlign: "center",
    },
    title: {
        lineHeight: "36px",
        fontSize: 31,
        fontWeight: 800,
        color: theme.palette.text.primary,
        marginBottom: 8
    },
    subTitle: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
    },
    link: {
        display: "block",
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));
