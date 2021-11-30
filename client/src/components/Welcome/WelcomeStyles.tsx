import {makeStyles, Theme} from "@material-ui/core";

export const useWelcomeStyles = makeStyles((theme: Theme) => ({
    info: {
        padding: "40px 20px",
    },
    infoTitle: {
        textAlign: "center",
        marginBottom: 12,
        fontSize: 20,
        fontWeight: 700,
    },
    infoText: {
        textAlign: "center",
        marginBottom: 20,
        color: theme.palette.text.secondary,
        fontSize: 15,
        fontWeight: 400,
    },
    infoButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    infoButton: {
        fontSize: 15,
        padding: "7px 15px",
    },
}));
