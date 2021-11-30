import {makeStyles, Theme} from "@material-ui/core";

export const useLoggedDevicesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    title: {
        fontWeight: 700,
        lineHeight: "20px",
        fontSize: 15,
        color: theme.palette.text.primary,
    },
    text: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontWeight: 400,
        lineHeight: "16px",
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
