import {makeStyles, Theme} from "@material-ui/core";

export const useMutedWordsStyles = makeStyles((theme: Theme) => ({
    mutedWordsInfo: {
        margin: "32px auto",
        width: 336,
        textAlign: "center",
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
