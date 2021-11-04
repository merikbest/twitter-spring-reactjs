import {makeStyles, Theme} from "@material-ui/core";

export const useAccountStyles = makeStyles((theme: Theme) => ({
    listWrapper: {
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
    accountInfo: {
        padding: "12px 16px",
        lineHeight: "16px",
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400
    },
    title: {
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
    },
    text: {
        lineHeight: "16px",
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400
    },
}));
