import {makeStyles, Theme} from "@material-ui/core";

export const useAudienceAndTaggingStyles = makeStyles((theme: Theme) => ({
    photoTaggingLink: {
        "& svg": {
            marginTop: 8,
        },
    },
    photoTagInfo: {
        display: "inline-block",
        width: 200
    },
}));
