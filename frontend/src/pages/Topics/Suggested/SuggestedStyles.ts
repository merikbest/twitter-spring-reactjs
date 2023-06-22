import { makeStyles } from "@material-ui/core";

export const useSuggestedStyles = makeStyles((theme) => ({
    suggestedButton: {
        display: "inline-block",
        padding: 2,
        "& .MuiButtonBase-root": {
            padding: 0,
            height: 96,
            width: 186,
            borderRadius: 12
        },
        "& .MuiButton-label": {
            fontSize: 17,
            fontWeight: 700
        }
    },
    showMoreButton: {
        padding: 16,
        color: theme.palette.primary.main,
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    }
}));
