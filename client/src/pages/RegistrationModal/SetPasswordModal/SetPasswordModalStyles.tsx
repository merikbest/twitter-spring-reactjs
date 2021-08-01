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
            color: "rgb(29, 161, 245)",
        },
    },
    title: {
        marginTop: 20,
        fontSize: 21,
        fontWeight: 700,
    },
    text: {
        marginTop: 15,
        color: "rgb(83, 100, 113)",
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: 490,
        marginBottom: 30,
    },
}));
