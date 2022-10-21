import {makeStyles, Theme} from "@material-ui/core";

export const useUnfollowButtonStyles = makeStyles((theme: Theme) => ({
    containedButton: {
        width: 105,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));
