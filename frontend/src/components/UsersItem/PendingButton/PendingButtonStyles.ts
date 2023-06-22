import { makeStyles } from "@material-ui/core";

export const usePendingButtonStyles = makeStyles((theme) => ({
    outlinedButton: {
        width: 79,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));
