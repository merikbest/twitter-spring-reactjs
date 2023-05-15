import { makeStyles } from "@material-ui/core";

export const useAccessibilityStyles = makeStyles(() => ({
    accessibilityLink: {
        "& svg": {
            marginTop: 8
        }
    },
    accessibilityInfo: {
        display: "inline-block",
        width: 200
    }
}));
