import {makeStyles, Theme} from "@material-ui/core";

export const useAdditionalResourcesStyles = makeStyles((theme: Theme) => ({
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
    text: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    title: {
        fontSize: 20,
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        lineHeight: "24px",
    },
    subtitle: {
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    listWrapper: {
        paddingBottom: 64,
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
    icon: {
        margin: "15px 30px 15px 15px",
    },
    arrowIcon: {
        marginLeft: "auto"
    },
}));
