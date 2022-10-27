import {makeStyles, Theme} from "@material-ui/core";

export const useUnfollowButtonStyles = makeStyles((theme: Theme) => ({
    containedButton: {
        float: "right",
        width: 101,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));
