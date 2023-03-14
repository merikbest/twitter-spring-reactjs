import { makeStyles, Theme } from "@material-ui/core";

export const useTweetErrorPageStyles = makeStyles((theme: Theme) => ({
    error: {
        width: 350,
        margin: "0 auto",
        paddingTop: 200,
        paddingBottom: 20,
        fontWeight: 700,
        textAlign: "center"
    },
    searchButton: {
        display: "block",
        width: 76,
        margin: "0 auto"
    }
}));
