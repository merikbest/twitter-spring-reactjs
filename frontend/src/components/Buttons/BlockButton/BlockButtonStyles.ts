import { makeStyles } from "@material-ui/core";

export const useBlockButtonStyles = makeStyles((theme) => ({
    containedButton: {
        width: 105,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    },
    blockButton: {
        backgroundColor: theme.palette.error.main
    }
}));
