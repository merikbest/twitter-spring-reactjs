import { makeStyles } from "@material-ui/core";

export const useLogoutModalStyles = makeStyles((theme) => ({
    modalWrapper: {
        width: 280,
        height: 212,
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: theme.palette.primary.main,
            height: "2em",
            width: "2em"
        },
        "& .MuiTypography-subtitle1": {
            marginTop: 8,
            marginBottom: 24
        },
        "& .MuiButton-root": {
            width: 134
        }
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalCancelButton: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.divider
    }
}));
