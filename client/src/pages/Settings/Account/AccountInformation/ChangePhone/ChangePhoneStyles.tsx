import {makeStyles, Theme} from "@material-ui/core";

export const useChangePhoneStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    updatePhoneNumber: {
        textAlign: "center",
        padding: 16,
        color: "rgb(29, 155, 240)",
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(29, 155, 240, 0.1)"
        }
    },
    deletePhoneNumber: {
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
}));
