import { makeStyles } from "@material-ui/core";

export const useImageCloseButtonStyles = makeStyles((theme) => ({
    imageModalClose: {
        margin: 10,
        "& svg": {
            height: "0.9em",
            color: theme.palette.common.white
        }
    }
}));
