import { makeStyles } from "@material-ui/core";

export const useLanguagesStyles = makeStyles(() => ({
    accessibilityWrapper: {
        "& svg": {
            marginTop: 10
        }
    },
    accessibilityInfo: {
        display: "inline-block",
        "& svg": {
            marginTop: 10
        }
    }
}));
