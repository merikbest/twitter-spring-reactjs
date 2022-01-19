import {makeStyles, Theme} from "@material-ui/core";

export const useSecurityStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    authLinkWrapper: {
        textDecoration: "none",
    },
    authLink: {
        padding: "12px 16px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer"
        },
        "& svg": {
            float: "right",
            color: theme.palette.text.secondary,
            height: "1.4em"
        },
    },
    passwordProtect: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            marginTop: -10,
            float: "right",
        },
    },
}));
