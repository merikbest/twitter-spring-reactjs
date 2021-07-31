import {makeStyles, Theme} from "@material-ui/core";

export const useCustomizeModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        height: 600,
        marginTop: 5,
        padding: "0 30px",
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 30,
            color: "rgb(29, 161, 245)",
        },
    },
    title: {
        fontWeight: 700,
        fontSize: 21,
        marginBottom: 44,
    },
    subtitle: {
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 12,
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
        marginBottom: 15,
        "& svg": {
            width: 16,
            height: 16
        },
    },
    link: {
        margin: "16px 0 32px 0",
        fontSize: 14,
        color: "rgb(27, 149, 224)",
        "&:hover": {
            cursor: "pointer",
        },
    },
}));
