import { makeStyles } from "@material-ui/core";

export const useTweetInteractionCountStyles = makeStyles(() => ({
    content: {
        display: "flex",
        alignItems: "center",
        margin: "16px 0",
        "& .MuiTypography-subtitle1": {
            marginLeft: 5
        }
    }
}));
