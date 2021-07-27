import {makeStyles, Theme} from "@material-ui/core";

export const useForgotPasswordStyles = makeStyles((theme: Theme) => ({
    container: {
        fontFamily: "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
    },
    header: {
        borderBottom: "0px solid #e1e8ed",
        boxShadow: "0 0 3px #aaa",
    },
    headerWrapper: {
        margin: "0px auto",
        paddingTop: 6,
        width: 590,
        height: 40,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 6,
            fill: 'rgb(29, 161, 242)',
            fontSize: 25,
        },
        "& p": {
            display: "inline",
            color: "#66757f",
            fontSize: 16,
        },
    },
    content: {
        margin: "0px auto",
        width: 590,
        paddingTop: 19,
        "& h1": {
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 36,
        },
    },
    warning: {
        color: "#c33",
        fontWeight: 200,
    },
    button: {
        padding: "5px 18px",
        marginTop: 25,
        display: "block",
        "&:active": {
            backgroundColor: "#006dbf",
            borderColor: "#006dbf",
            boxShadow: "0 0 0 2px #fff, 0 0 0 4px #1da1f2",
            color: "#fff",
        },
    },
}));
