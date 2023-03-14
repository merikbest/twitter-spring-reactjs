import { makeStyles } from "@material-ui/core";

export const useTweetTextStyles = makeStyles((theme) => ({
    text: {
        fontWeight: 400,
        marginTop: 16,
        marginBottom: 16,
        wordBreak: "break-word",
        "& #hashtag": {
            color: theme.palette.primary.main
        }
    }
}));
