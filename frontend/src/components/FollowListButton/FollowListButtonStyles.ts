import { makeStyles } from "@material-ui/core";

export const useFollowListButtonStyles = makeStyles((theme) => ({
    listPrimaryButton: {
        width: 105,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    },
    listOutlinedButton: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));
