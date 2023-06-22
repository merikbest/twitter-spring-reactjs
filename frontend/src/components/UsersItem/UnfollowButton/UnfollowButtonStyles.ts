import { makeStyles } from "@material-ui/core";

export const useUnfollowButtonStyles = makeStyles((theme) => ({
    containedButton: {
        float: "right",
        width: 101,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    }
}));
