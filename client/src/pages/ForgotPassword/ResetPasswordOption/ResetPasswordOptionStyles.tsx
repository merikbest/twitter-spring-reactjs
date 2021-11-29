import {makeStyles, Theme} from "@material-ui/core";

export const useResetPasswordOptionStyles = makeStyles((theme: Theme) => ({
    text: {
        margin: "14px 0px",
        fontSize: 16
    },
    emailWrapper: {
        margin: "16px 0",
    },
    email: {
        fontWeight: 400,
        fontSize: 16,
    },
    radio: {
        padding: 0,
        marginRight: 5,
        marginBottom: 5,
        "& svg": {
            width: 16,
            height: 16
        },
    },
    formWrapper: {
        margin: "32px 0 16px 0",
    },
    button: {
        padding: "5px 18px",
        marginTop: 25,
        display: "block",
        "&:active": {
            backgroundColor: "#006dbf",
            borderColor: "#006dbf",
            boxShadow: "0 0 0 2px #fff, 0 0 0 4px #1da1f2",
            color: theme.palette.common.white,
        },
    },
    link: {
        fontSize: 13,
        color: theme.palette.primary.main,
        "&:hover": {
            textDecoration: "underline",
            cursor: 'pointer',
        },
    },
}));
