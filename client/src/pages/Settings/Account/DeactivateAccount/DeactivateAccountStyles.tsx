import {makeStyles, Theme} from "@material-ui/core";

export const useDeactivateAccountStyles = makeStyles((theme: Theme) => ({
    deactivateAccountWrapper: {
        "& a": {
            textDecoration: "none",
        },
    },
    infoItemWrapper: {
        padding: "12px 16px"
    },
    userInfoWrapper: {
        display: "flex",
        padding: "12px 16px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        },
    },
    avatar: {
        width: "46px !important",
        height: "46px !important",
    },
    usernameWrapper: {
        marginLeft: 15
    },
    fullName: {
        fontWeight: 700,
        fontSize: 15,
        color: theme.palette.text.primary,
        lineHeight: "20px"
    },
    username: {
        fontWeight: 400,
        fontSize: 15,
        color: theme.palette.text.secondary,
        lineHeight: "20px"
    },
    title: {
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: theme.palette.text.primary,
    },
    text: {
        fontWeight: 400,
        lineHeight: "16px",
        fontSize: 13,
        color: theme.palette.text.secondary,
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    deleteUser: {
        textAlign: "center",
        padding: 16,
        color: theme.palette.error.main,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
}));
