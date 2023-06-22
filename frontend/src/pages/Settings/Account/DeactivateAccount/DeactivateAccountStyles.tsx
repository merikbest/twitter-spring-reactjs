import { makeStyles } from "@material-ui/core";

export const useDeactivateAccountStyles = makeStyles((theme) => ({
    userInfoWrapper: {
        display: "flex",
        padding: "12px 16px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        },
        "& .MuiTypography-body1": {
            fontWeight: 700
        }
    },
    usernameWrapper: {
        marginLeft: 15
    },
    deleteUser: {
        textAlign: "center",
        padding: 16,
        cursor: "pointer",
        "& .MuiTypography-body1": {
            color: theme.palette.error.main
        },
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    }
}));
