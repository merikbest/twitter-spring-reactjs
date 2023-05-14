import { makeStyles } from "@material-ui/core";

export const useInteractionCountStyles = makeStyles(() => ({
    interactionCount: {
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer"
        }
    }
}));
