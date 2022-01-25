import {makeStyles, Theme} from "@material-ui/core";

export const useLanguagesStyles = makeStyles((theme: Theme) => ({
    accessibilityWrapper: {
        "& svg": {
            marginTop: 10
        },
    },
    accessibilityInfo: {
        display: "inline-block",
        "& svg": {
            marginTop: 10
        },
    },
}));
