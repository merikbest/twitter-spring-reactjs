import {makeStyles, Theme} from "@material-ui/core";

export const useRegistrationModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        height: 600,
        marginTop: 5,
        padding: "0 30px",
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
        fontWeight: 700,
        fontSize: 21,
        marginTop: 20,
        marginBottom: 28,
    },
    formWrapper: {
        // margin: "16px 10px 0 10px"
    },
    inputWrapper: {
        display: "flex",
        justifyContent: "space-between",
    },
    link: {
        margin: "16px 0 32px 0",
        fontSize: 15,
        color: "rgb(27, 149, 224)",
        "&:hover": {
            cursor: "pointer",
        },
    },
    footer: {
        marginBottom: 47,
    },
    footerText: {
        color: "rgb(83, 100, 113)",
    },
    formControl: {
        margin: "16px 0",
    },
}));
