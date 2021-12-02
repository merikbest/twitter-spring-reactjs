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
                backgroundColor: theme.palette.secondary.main,
            },
        },
        "& svg": {
            color: theme.palette.text.secondary,
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
        color: theme.palette.text.secondary,
        fontWeight: 400
    },
    title: {
        fontSize: 15,
        color: theme.palette.text.primary,
        fontWeight: 400,
        lineHeight: "20px",
    },
    text: {
        lineHeight: "16px",
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontWeight: 400
    },
}));
