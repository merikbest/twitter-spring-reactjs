import { makeStyles } from "@material-ui/core";

export const useTweetInteractionCountStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        alignItems: "center",
        margin: "16px 0",
        "& .MuiTypography-subtitle1": {
            marginLeft: 5
        }
    },
    interactionCount: {
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer"
        }
    }
}));
