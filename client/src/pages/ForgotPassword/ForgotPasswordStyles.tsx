import {makeStyles, Theme} from "@material-ui/core";

export const useForgotPasswordStyles = makeStyles((theme: Theme) => ({
    container: {
        fontFamily: "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "& a": {
            textDecoration: "none",
        }
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
            fill: theme.palette.primary.main,
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
}));
