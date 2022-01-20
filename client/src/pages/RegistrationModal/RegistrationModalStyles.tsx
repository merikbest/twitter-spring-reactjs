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
            height: "1.75rem",
            width: "1.75rem",
            color: theme.palette.primary.main,
        },
    },
    title: {
        marginTop: 20,
        marginBottom: 28,
    },
    inputWrapper: {
        display: "flex",
        justifyContent: "space-between",
    },
    phoneLink: {
        display: "inline-block",
        margin: "16px 0 32px 0",
    },
    footer: {
        marginBottom: 47,
        "& .MuiTypography-h6": {
            fontWeight: 700,
        },
    },

    formControl: {
        margin: "16px 0",
    },
    buttonWrapper: {
        marginBottom: 15,
    }
}));
