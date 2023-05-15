import { makeStyles } from "@material-ui/core";

export const useAudienceAndTaggingStyles = makeStyles(() => ({
    photoTaggingLink: {
        "& svg": {
            marginTop: 8
        }
    },
    photoTagInfo: {
        display: "inline-block",
        width: 200
    }
}));
