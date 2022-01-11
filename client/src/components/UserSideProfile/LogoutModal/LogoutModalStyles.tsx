import {makeStyles, Theme} from "@material-ui/core";

export const useLogoutModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        height: 212,
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: theme.palette.primary.main,
            height: "2em",
            width: "2em",
        },
        "& .MuiTypography-subtitle1": {
            marginTop: 8,
            marginBottom: 24,
        },
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalCancelButton: {
        width: 134,
        height: 40,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.divider,
        borderRadius: '25px',
    },
    modalLogoutButton: {
        width: 134,
        height: 40,
        borderRadius: '25px',
    },
}));
