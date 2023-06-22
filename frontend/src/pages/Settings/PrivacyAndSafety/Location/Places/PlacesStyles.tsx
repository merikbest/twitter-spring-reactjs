import { makeStyles } from "@material-ui/core";

export const useLocationStyles = makeStyles((theme) => ({
    deleteUser: {
        textAlign: "center",
        padding: 16,
        cursor: "pointer",
        "& .MuiTypography-root": {
            color: theme.palette.error.main
        },
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
    locationInfoWrapper: {
        display: "flex",
        "& .MuiTypography-root": {
            marginTop: 8
        }
    },
    locationIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 40,
        height: 40,
        border: "1px solid rgb(229, 234, 236)",
        borderRadius: "50%"
    },
    locationIconIcon: {
        marginTop: 3,
        "& svg": {
            color: theme.palette.text.primary,
            height: "1.5em"
        }
    }
}));
