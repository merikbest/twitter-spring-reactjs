import {makeStyles, Theme} from "@material-ui/core";

export const useCloseButtonStyles = makeStyles((theme: Theme) => ({
    close: {
        "& .MuiIconButton-root": {
            marginRight: 15,
        },
    }
}));
