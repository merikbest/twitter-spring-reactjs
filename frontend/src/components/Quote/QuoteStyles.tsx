import { makeStyles } from "@material-ui/core";

export const useQuoteStyles = makeStyles((theme) => ({
    quoteTweetLink: {
        textDecoration: "none",
        color: theme.palette.text.primary,
        "& #link": {
            color: theme.palette.primary.main
        }
    },
    quoteTweetContainer: {
        marginTop: 5,
        padding: 12,
        minHeight: 68,
        width: "100%",
        marginLeft: 0,
        fontSize: 14,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    quoteTweetWrapper: {
        display: "flex",
        justifyContent: "flex-start"
    },
    quoteTweetAvatar: {
        marginRight: 3,
        maxWidth: "20px !important",
        maxHeight: "20px !important"
    },
    quoteTweetFullName: {
        fontWeight: 700,
        marginRight: 3
    },
    quoteTweetUsername: {
        color: theme.palette.text.secondary
    },
    quoteTweetText: {
        width: 490,
        "& #hashtag": {
            color: theme.palette.primary.main
        }
    }
}));
