import { makeStyles } from "@material-ui/core";

export const useTweetDeletedStyles = makeStyles((theme) => ({
    container: {
        padding: "12px 16px",
        marginTop: 16,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.secondary,
        borderRadius: 16,
        fontSize: 15,
        lineHeight: "20px",
        border: `1px solid ${theme.palette.grey[200]}`
    }
}));
