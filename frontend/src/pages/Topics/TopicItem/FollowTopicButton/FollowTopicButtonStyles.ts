import { makeStyles } from "@material-ui/core";

export const useFollowTopicButtonStyles = makeStyles((theme) => ({
    outlinedButton: {
        float: "right",
        width: 79,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));
