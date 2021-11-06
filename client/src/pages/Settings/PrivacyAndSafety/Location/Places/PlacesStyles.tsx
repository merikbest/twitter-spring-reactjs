import {makeStyles, Theme} from "@material-ui/core";

export const useLocationStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    deleteUser: {
        textAlign: "center",
        padding: 16,
        color: "rgb(244, 33, 46)",
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
            color: "rgb(15, 20, 25)",
            height: "1.5em"
        },
    },
}));
