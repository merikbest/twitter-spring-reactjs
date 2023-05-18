import { makeStyles, Theme } from "@material-ui/core";

export const useShareActionsItemStyles = makeStyles((theme: Theme) => ({
    listItem: {
        height: 52,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        },
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    }
}));
