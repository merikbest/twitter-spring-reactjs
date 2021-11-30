import {makeStyles, Theme} from "@material-ui/core";

export const useLogoutModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        height: 212,
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: theme.palette.primary.main,
            fontSize: 45,
        },
    },
    modalFullName: {
        color: theme.palette.text.primary,
        fontWeight: 700,
        fontSize: 20,
    },
    modalUsername: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
        marginTop: 8,
        marginBottom: 24,
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
        border: '1px solid',
        borderRadius: '25px',
    },
}));
