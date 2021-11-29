import {makeStyles, Theme} from "@material-ui/core";

export const useCheckEmailCodeStyles = makeStyles((theme: Theme) => ({
    text: {
        margin: "14px 0px",
        fontSize: 16
    },
    errorMessage: {
        display: "inline-block",
        marginTop: 10,
        marginLeft: 15,
        color: "#c33",
        fontSize: 13,
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
    footerText: {
        fontSize: 16,
        marginTop: 14,
        marginBottom: 68,
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
