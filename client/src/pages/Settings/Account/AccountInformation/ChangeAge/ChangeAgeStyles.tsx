import {makeStyles, Theme} from "@material-ui/core";

export const useChangeAgeStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
    },
    text: {
        padding: "12px 16px",
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px"
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
