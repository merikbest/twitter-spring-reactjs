import {makeStyles, Theme} from "@material-ui/core";

export const useProfileDescriptionInputStyles = makeStyles((theme: Theme) => ({
    container: {

    },
    content: {
        position: "absolute",
        zIndex: 2,
        right: 0,
        fontSize: 3,
        marginTop: 15,
        marginRight: 40,
    },
    inputCount: {
        marginTop: -9,

        display: "inline",
        "& .MuiInputLabel-formControl": {
            position: "relative",
        },
    },
}));
