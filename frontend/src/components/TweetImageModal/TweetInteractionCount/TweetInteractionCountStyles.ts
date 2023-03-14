import { makeStyles } from "@material-ui/core";

export const useTweetInteractionCountStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        alignItems: "center",
        margin: "16px 0",
        "& a": {
            color: theme.palette.text.primary,
            textDecoration: "none"
        },
        "& .MuiTypography-subtitle1": {
            marginLeft: 5
        }
    }
}));
