import {makeStyles, Theme} from "@material-ui/core";

export const useConnectedAppsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        lineHeight: "16px",
    },
    connectedAppsWrapper: {
        margin: "32px auto",
        width: 336,
        textAlign: "center"
    },
    title: {
        marginBottom: 8,
        lineHeight: "36px",
        fontSize: 31,
        fontWeight: 800,
        color: "rgb(15, 20, 25)",
    },
    subtitle: {
        lineHeight: "20px",
        fontSize: 15,
        fontWeight: 400,
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
}));
