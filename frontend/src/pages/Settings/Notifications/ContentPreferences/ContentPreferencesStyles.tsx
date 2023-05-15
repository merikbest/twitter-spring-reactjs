import { makeStyles } from "@material-ui/core";

export const useContentPreferencesStyles = makeStyles(() => ({
    personalizationLink: {
        "& svg": {
            marginTop: 8
        }
    },
    personalizationInfo: {
        display: "inline-block",
        width: 200
    }
}));
