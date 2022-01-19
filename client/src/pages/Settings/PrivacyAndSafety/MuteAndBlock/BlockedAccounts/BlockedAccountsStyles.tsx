import {makeStyles, Theme} from "@material-ui/core";

export const useBlockedAccountsStyles = makeStyles((theme: Theme) => ({
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    tab: {
        minWidth: 299,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
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
}));
