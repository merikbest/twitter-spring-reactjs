import { makeStyles } from "@material-ui/core";

export const useTweetTextStyles = makeStyles((theme) => ({
    text: {
        "& a": {
            display: "block",
            width: 490,
            color: "inherit",
            textDecoration: "none"
        },
        "& #hashtag": {
            color: theme.palette.primary.main
        },
        "& #mention": {
            color: theme.palette.primary.main
        },
        "& #link": {
            color: theme.palette.primary.main
        }
    }
}));
