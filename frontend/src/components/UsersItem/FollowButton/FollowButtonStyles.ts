import { makeStyles, Theme } from "@material-ui/core";

export const useFollowButtonStyles = makeStyles((theme: Theme) => ({
    outlinedButton: {
        float: "right",
        width: 79,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));
