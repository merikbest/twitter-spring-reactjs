import {makeStyles, Theme} from "@material-ui/core";

export const useAccessibilityStyles = makeStyles((theme: Theme) => ({
    accessibilityLink: {
        "& svg": {
            marginTop: 8,
        },
    },
    accessibilityInfo: {
        display: "inline-block",
        width: 200
    },
}));
