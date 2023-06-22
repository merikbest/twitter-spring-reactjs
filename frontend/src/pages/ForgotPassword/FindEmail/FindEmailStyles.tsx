import { makeStyles } from "@material-ui/core";

export const useFindEmailStyles = makeStyles((theme) => ({
    warning: {
        fontSize: 28,
        fontWeight: 700,
        color: "rgb(204, 51, 51)",
        lineHeight: "36px"
    },
    text: {
        margin: "14px 0px"
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
    }
}));
