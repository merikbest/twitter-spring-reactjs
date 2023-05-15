import { makeStyles } from "@material-ui/core";

export const usePollInputStyles = makeStyles(() => ({
    container: {
        marginBottom: 11,
        position: "relative"
    },
    content: {
        position: "absolute",
        right: 10,
        display: "flex",
        zIndex: 3,
        marginTop: 8
    }
}));
