import { makeStyles } from "@material-ui/core";

export const useForgotPasswordStyles = makeStyles((theme) => ({
    container: {
        fontFamily: "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "& a": {
            textDecoration: "none"
        }
    },
    header: {
        borderBottom: "0px solid #e1e8ed",
        boxShadow: "0 0 3px #aaa"
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
            fontSize: 25
        }
    },
    content: {
        margin: "0px auto",
        width: 590,
        paddingTop: 19
    }
}));
