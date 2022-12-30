import {makeStyles, Theme} from "@material-ui/core";

export const useBackButtonStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            marginRight: 20,
            marginLeft: 10,
        },
    },
}));
