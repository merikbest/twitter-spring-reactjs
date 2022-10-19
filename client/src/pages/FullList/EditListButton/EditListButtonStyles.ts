import {makeStyles, Theme} from "@material-ui/core";

export const useEditListButtonStyles = makeStyles((theme: Theme) => ({
    listOutlinedButton: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));
