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
        "& .MuiTypography-body1": {
            fontWeight: 700,
        },
    },
    avatar: {
        width: "46px !important",
        height: "46px !important",
    },
    usernameWrapper: {
        marginLeft: 15
    },
    routerLink: {
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
        cursor: "pointer",
        "& .MuiTypography-body1": {
            color: theme.palette.error.main,
        },
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
}));
