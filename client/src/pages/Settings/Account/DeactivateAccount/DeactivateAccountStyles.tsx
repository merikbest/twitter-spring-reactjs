import {makeStyles, Theme} from "@material-ui/core";

export const useDeactivateAccountStyles = makeStyles((theme: Theme) => ({
    container: {
        minWidth: 600,
        "& .MuiPaper-outlined": {
            padding: 0,
            borderRadius: 0,
            minHeight: '100vh',
            borderLeft: 0,
            borderTop: 0,
            borderBottom: 0,
        },
    },
    infoWrapper: {
        paddingTop: 53,
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
            backgroundColor: "rgb(247, 249, 249)"
        },
    },
    avatar: {
        width: "46px !important",
        height: "46px !important",
    },
    usernameWrapper: {
        marginLeft: 15
    },
    fullName: {
        fontWeight: 700,
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        lineHeight: "20px"
    },
    username: {
        fontWeight: 400,
        fontSize: 15,
        color: "rgb(83, 100, 113)",
        lineHeight: "20px"
    },
    title: {
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: "rgb(15, 20, 25)",
    },
    text: {
        fontWeight: 400,
        lineHeight: "16px",
        fontSize: 13,
        color: "rgb(83, 100, 113)",
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
}));
