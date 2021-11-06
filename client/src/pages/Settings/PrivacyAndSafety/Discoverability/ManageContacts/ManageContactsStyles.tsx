import {makeStyles, Theme} from "@material-ui/core";

export const useManageContactsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    removeContacts: {
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
