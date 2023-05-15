import { makeStyles } from "@material-ui/core";

export const useBackButtonStyles = makeStyles(() => ({
    container: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            marginRight: 20,
            marginLeft: 10
        }
    }
}));
