import {makeStyles, Theme} from "@material-ui/core";

export const useBlockedAccountsStyles = makeStyles((theme: Theme) => ({
    tabs: {
        borderBottom: "1px solid rgb(239, 243, 244)",
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: "rgb(29, 161, 242)",
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    tab: {
        minWidth: 299,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(29, 161, 242, 0.1)',
        },
    },
    infoItemWrapper: {
        padding: "12px 16px"
    },
    blockedAccountsInfo: {
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
}));
