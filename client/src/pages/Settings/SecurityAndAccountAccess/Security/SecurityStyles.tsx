import {makeStyles, Theme} from "@material-ui/core";

export const useSecurityStyles = makeStyles((theme: Theme) => ({
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
        paddingTop: 53
    },
    infoItemWrapper: {
        padding: "12px 16px"
    },
    title: {
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: "rgb(15, 20, 25)",
    },
    text: {
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        lineHeight: "16px",
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
    authLinkWrapper: {
        textDecoration: "none",
    },
    authLink: {
        padding: "12px 16px",
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
        "&:hover": {
            backgroundColor: "rgb(247, 249, 249)",
            cursor: "pointer"
        },
        "& svg": {
            float: "right",
            color: "rgb(83, 100, 113)",
            height: "1.4em"
        },
    },
    passwordProtect: {
        paddingBottom: 12,
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
        "& .MuiCheckbox-root": {
            marginTop: -10,
            float: "right",
        },
    },
}));
