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
        color: theme.palette.text.primary,
        marginBottom: 8
    },
    subTitle: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
    },
    text: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));
