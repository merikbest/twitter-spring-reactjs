import { makeStyles } from "@material-ui/core";

export const useEditListButtonStyles = makeStyles((theme) => ({
    listOutlinedButton: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));
