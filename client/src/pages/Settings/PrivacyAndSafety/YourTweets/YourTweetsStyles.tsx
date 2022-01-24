import {makeStyles, Theme} from "@material-ui/core";

export const useYourTweetsStyles = makeStyles((theme: Theme) => ({
    yourTweetsLink: {
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
}));
