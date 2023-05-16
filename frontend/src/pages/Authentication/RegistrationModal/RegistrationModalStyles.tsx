import { makeStyles } from "@material-ui/core";

export const useRegistrationModalStyles = makeStyles(() => ({
    title: {
        marginTop: 20,
        marginBottom: 28
    },
    inputWrapper: {
        display: "flex",
        justifyContent: "space-between"
    },
    phoneLink: {
        display: "inline-block",
        margin: "16px 0 32px 0"
    },
    footer: {
        marginBottom: 47,
        "& .MuiTypography-h6": {
            fontWeight: 700
        }
    },
    formControl: {
        margin: "16px 0"
    }
}));
