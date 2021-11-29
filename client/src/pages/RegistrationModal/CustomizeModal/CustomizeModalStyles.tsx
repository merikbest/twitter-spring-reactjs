import {makeStyles, Theme} from "@material-ui/core";

export const useCustomizeModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        minHeight: 600,
        marginTop: 5,
        padding: "0 30px",
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 30,
            color: theme.palette.primary.main,
        },
    },
    title: {
        fontWeight: 700,
        fontSize: 21,
        marginBottom: 44,
        lineHeight: "28px",
    },
    subtitle: {
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 12,
        lineHeight: "20px",
    },
    text: {
        width: 450,
        display: "inline-block",
        marginBottom: 40,
        lineHeight: "20px",
        fontSize: 15,
    },
    radio: {
        display: "inline-block",
        padding: 0,
        marginLeft: 15,
        marginBottom: 45,
        "& svg": {
            width: 16,
            height: 16
        },
    },
    link: {
        textDecoration: "none",
        margin: "16px 0 32px 0",
        fontSize: 14,
        color: theme.palette.primary.main,
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        },
    },
    buttonWrapper: {
        marginTop: 285
    },
}));
