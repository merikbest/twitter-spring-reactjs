import {makeStyles, Theme} from "@material-ui/core";

export const useContentPreferencesStyles = makeStyles((theme: Theme) => ({
    personalizationLink: {
        "& svg": {
            marginTop: 8,
        },
    },
    personalizationInfo: {
        display: "inline-block",
        width: 200
    },
}));
