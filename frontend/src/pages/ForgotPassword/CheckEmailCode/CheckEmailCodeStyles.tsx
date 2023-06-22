import { makeStyles } from "@material-ui/core";

export const useCheckEmailCodeStyles = makeStyles((theme) => ({
    text: {
        margin: "14px 0px"
    },
    errorMessage: {
        display: "inline-block",
        marginTop: 10,
        marginLeft: 15,
        color: "#c33",
        fontSize: 13
    },
    button: {
        marginTop: 25,
        display: "block",
        "&:active": {
            backgroundColor: "#006dbf",
            borderColor: "#006dbf",
            boxShadow: "0 0 0 2px #fff, 0 0 0 4px #1da1f2",
            color: theme.palette.common.white
        }
    },
    footerText: {
        marginTop: 14,
        marginBottom: 68
    }
}));
