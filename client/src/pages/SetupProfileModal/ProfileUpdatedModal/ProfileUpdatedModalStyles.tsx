import {makeStyles} from "@material-ui/core";

export const useProfileUpdatedModalStyles = makeStyles((theme) => ({
    container: {
        width: 598,
        height: 600,
        marginTop: 5,
        position: "relative",
    },
    logoIcon: {
        margin: "180px auto 80px auto",
        width: 54,
        "& svg": {
            fontSize: 50,
            color: theme.palette.primary.main,
        },
    },
    title: {
        width: 250,
        margin: "0px auto",
        fontWeight: 700,
        fontSize: 23,
    },
    buttonWrapper: {
        width: 250,
        margin: "80px auto 0px auto",
    },
    button: {
        width: 250,
        height: 50,
        fontSize: 15,
    },
}));
