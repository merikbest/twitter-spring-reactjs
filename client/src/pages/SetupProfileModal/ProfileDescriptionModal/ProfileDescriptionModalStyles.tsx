import {makeStyles} from "@material-ui/core";

export const useProfileDescriptionModalStyles = makeStyles((theme) => ({
    container: {
        width: 598,
        height: 600,
        marginTop: 5,
        position: "relative",
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 34,
            color: theme.palette.primary.main,
        },
    },
    title: {
        margin: "16px 0",
        fontWeight: 700,
        fontSize: 23,
    },
    text: {
        color: theme.palette.text.secondary,
        fontSize: 15,
        marginBottom: 30,
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: 530,
        marginBottom: 30,
        fontSize: 15,
    },
}));
