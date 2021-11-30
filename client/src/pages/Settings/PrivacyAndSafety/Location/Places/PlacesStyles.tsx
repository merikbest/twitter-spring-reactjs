import {makeStyles, Theme} from "@material-ui/core";

export const useLocationStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
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
    locationInfoWrapper: {
        display: "flex",
        "& .MuiTypography-root": {
            marginTop: 8
        },
    },
    locationIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 40,
        height: 40,
        border: "1px solid rgb(229, 234, 236)",
        borderRadius: "50%",
    },
    locationIconIcon: {
        marginTop: 3,
        "& svg": {
            color: theme.palette.text.primary,
            height: "1.5em"
        },
    },
}));
