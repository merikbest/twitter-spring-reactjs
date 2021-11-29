import {makeStyles, Theme} from "@material-ui/core";

export const useSetPasswordModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        height: 600,
        marginTop: 5,
        padding: "0 30px",
        position: "relative",
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 30,
            color: theme.palette.primary.main,
        },
    },
    title: {
        marginTop: 20,
        fontSize: 21,
        fontWeight: 700,
        linHeight: "24px"
    },
    text: {
        fontSize: 15,
        marginTop: 15,
        color: theme.palette.text.secondary,
        linHeight: "20px",
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: 490,
        marginBottom: 30,
    },
}));
