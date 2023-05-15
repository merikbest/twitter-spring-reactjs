import { makeStyles } from "@material-ui/core";

export const useCloseButtonStyles = makeStyles(() => ({
    close: {
        "& .MuiIconButton-root": {
            marginRight: 15
        }
    }
}));
