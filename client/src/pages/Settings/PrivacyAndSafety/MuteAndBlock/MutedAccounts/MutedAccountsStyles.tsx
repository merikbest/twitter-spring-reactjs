import {makeStyles, Theme} from "@material-ui/core";

export const useMutedAccountsStyles = makeStyles((theme: Theme) => ({
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
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    mutedAccountsInfo: {
        margin: "32px auto",
        width: 336,
        textAlign: "center",
    },
    title: {
        lineHeight: "36px",
        fontSize: 31,
        fontWeight: 800,
        color: "rgb(15, 20, 25)",
        marginBottom: 8
    },
    subTitle: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
    },
}));
