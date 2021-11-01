import {makeStyles, Theme} from "@material-ui/core";

export const useLoggedDevicesStyles = makeStyles((theme: Theme) => ({
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
        fontWeight: 700,
        lineHeight: "20px",
        fontSize: 15,
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
}));
