import {makeStyles, Theme} from "@material-ui/core";

export const useResetPasswordStyles = makeStyles((theme: Theme) => ({
    userInfoWrapper: {
        display: "flex"
    },
    text: {
        margin: "14px 0px",
        fontSize: 15
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
        fontSize: 14,
    },
    fullName: {
        fontSize: 14,
        fontWeight: 700,
    },
    username: {
        fontSize: 14,
        fontWeight: 400,
        color: theme.palette.text.secondary,
    },
    resetPasswordText: {
        margin: "14px 0px",
        fontSize: 15
    },
    enterPasswordText: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 700,
    },
    more: {
        marginLeft: 5,
        fontSize: 15,
        color: theme.palette.primary.main,
        "&:hover": {
            textDecoration: "underline",
            cursor: 'pointer',
        },
    },
    errorMessage: {
        display: "inline-block",
        marginTop: 10,
        marginLeft: 15,
        color: "#c33",
        fontSize: 13,
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
}));
