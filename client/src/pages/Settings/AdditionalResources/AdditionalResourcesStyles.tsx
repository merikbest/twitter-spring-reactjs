import {makeStyles, Theme} from "@material-ui/core";

export const useAdditionalResourcesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    title: {
        fontSize: 20,
        color: theme.palette.text.primary,
        fontWeight: 800,
        lineHeight: "24px",
    },
    subtitle: {
        fontSize: 15,
        color: theme.palette.text.primary,
        fontWeight: 400,
        lineHeight: "20px",
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
}));
