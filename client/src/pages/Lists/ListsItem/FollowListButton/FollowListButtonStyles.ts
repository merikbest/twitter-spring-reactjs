import {makeStyles, Theme} from "@material-ui/core";

export const useFollowListButtonStyles = makeStyles((theme: Theme) => ({
    listPrimaryButton: {
        width: 105,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    listOutlinedButton: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));
