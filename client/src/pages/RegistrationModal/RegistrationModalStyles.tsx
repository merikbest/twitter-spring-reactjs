import {makeStyles, Theme} from "@material-ui/core";

export const useRegistrationModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        minHeight: 600,
        marginTop: 5,
        padding: "0 30px",
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
        fontWeight: 700,
        fontSize: 21,
        marginTop: 20,
        marginBottom: 28,
        lineHeight: "28px",
    },
    inputWrapper: {
        display: "flex",
        justifyContent: "space-between",
    },
    link: {
        lineHeight: "20px",
        margin: "16px 0 32px 0",
        fontSize: 15,
        color: theme.palette.primary.main,
        "&:hover": {
            cursor: "pointer",
        },
    },
    footer: {
        marginBottom: 47,
    },
    footerText: {
        fontSize: 15,
        lineHeight: "20px",
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: "16px 0",
    },
    buttonWrapper: {
        marginBottom: 15,
    }
}));
