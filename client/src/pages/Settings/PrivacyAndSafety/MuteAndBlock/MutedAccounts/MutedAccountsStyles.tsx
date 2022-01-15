import {makeStyles, Theme} from "@material-ui/core";

export const useMutedAccountsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
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
}));
