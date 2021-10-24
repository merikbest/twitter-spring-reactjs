import {makeStyles, Theme} from "@material-ui/core";

export const useChangeLanguageStyles = makeStyles((theme: Theme) => ({
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
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0,
        },
        "& .MuiListItem-root": {
            padding: "12px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgb(247, 249, 249)",
            },
        },
        "& svg": {
            color: "rgb(83, 100, 113)",
            height: "1.3em",
        },
    },
    text: {
        padding: "12px 16px",
        lineHeight: "16px",
        "& .MuiTypography-root": {
            fontSize: 13,
            color: "rgb(83, 100, 113)",
            fontWeight: 400
        },
    },
    title: {
        padding: "12px 16px",
        lineHeight: "24px",
        "& .MuiTypography-root": {
            fontSize: 20,
            color: "rgb(15, 20, 25)",
            fontWeight: 800
        },
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    listItemTitle: {
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
    },
    listItemText: {
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        lineHeight: "16px",
    },
    arrowIcon: {
        marginLeft: "auto"
    },
}));
