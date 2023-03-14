import { makeStyles } from "@material-ui/core";

export const useTweetHeaderStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        "& a": {
            cursor: "pointer",
            textDecoration: "none",
            color: theme.palette.text.primary,
            "&:hover": {
                "& #link": {
                    textDecoration: "underline"
                }
            }
        }
    },
    avatar: {
        marginRight: 15,
        margin: "12px 12px 16px 5px"
    }
}));
