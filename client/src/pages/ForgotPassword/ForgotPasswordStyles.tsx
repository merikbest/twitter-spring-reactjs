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
    avatar: {
        marginRight: 5,
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    info: {
        display: "inline",
        flex: 1,
        marginLeft: 10,
        '& b': {
            fontSize: 14,
        },
        "& p": {
            fontSize: 14,
            color: "#657786",
        },
    },
    warning: {
        color: "#c33",
        fontWeight: 200,
    },
    errorMessage: {
        display: "inline-block",
        marginTop: 10,
        marginLeft: 15,
        color: "#c33",
        fontSize: 13,
    },
    emailWrapper: {
        margin: "16px 0",
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
    email: {
        fontWeight: 400,
        fontSize: 16,
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
    footerText: {
        marginBottom: 68,
    },
    link: {
        fontSize: 13,
        color: "#55acee",
        "&:hover": {
            cursor: 'pointer',
        },
    },
    more: {
        marginLeft: 5,
        fontSize: 14,
        color: "#55acee",
        "&:hover": {
            cursor: 'pointer',
        },
    },
    checkbox: {
        marginTop: 10,
        "& .MuiButtonBase-root": {
            padding: "0 5px 0 0",
            "& svg": {
                width: 18,
                height: 18,
            },
        },
    },
}));
