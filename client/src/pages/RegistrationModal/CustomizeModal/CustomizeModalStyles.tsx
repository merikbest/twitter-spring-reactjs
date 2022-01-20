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
            height: "1.75rem",
            width: "1.75rem",
            color: theme.palette.primary.main,
        },
    },
    title: {
        marginBottom: 44,
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
    buttonWrapper: {
        marginTop: 285
    },
}));
