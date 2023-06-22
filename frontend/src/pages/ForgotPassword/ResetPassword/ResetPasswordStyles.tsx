import { makeStyles } from "@material-ui/core";

export const useResetPasswordStyles = makeStyles((theme) => ({
    title: {
        fontSize: 23,
        fontWeight: 700,
        color: theme.palette.common.black,
        lineHeight: "36px"
    },
    userInfoWrapper: {
        marginTop: 30,
        display: "flex"
    },
    text: {
        margin: "14px 0px"
    },
    avatar: {
        marginRight: 5,
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    info: {
        display: "inline",
        flex: 1,
        marginLeft: 10
    },
    resetPasswordText: {
        margin: "14px 0px",
        "& a": {
            marginLeft: 5,
            color: theme.palette.primary.main,
            "&:hover": {
                textDecoration: "underline",
                cursor: "pointer"
            }
        }
    },
    enterPasswordText: {
        marginTop: 10,
        fontWeight: 700
    },
    errorMessage: {
        display: "inline-block",
        marginTop: 10,
        marginLeft: 15,
        color: "#c33",
        fontSize: 13
    },
    checkbox: {
        marginTop: 10,
        "& .MuiButtonBase-root": {
            padding: "0 5px 2px 0",
            "& svg": {
                width: 18,
                height: 18
            }
        }
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
