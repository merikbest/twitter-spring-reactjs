import {makeStyles, Theme} from "@material-ui/core";

export const useLoginStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 334,
        margin: "0 auto",
    },
    input: {
        marginBottom: 24,
    },
    button: {
        height: 46,
        padding: theme.spacing(3.2),
        "& .MuiButton-label": {
            fontSize: 15,
        },
    },
}));
