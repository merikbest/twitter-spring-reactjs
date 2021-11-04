import {makeStyles, Theme} from "@material-ui/core";

export const useChangeAgeStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
    },
    text: {
        padding: "12px 16px",
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px"
    },
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
}));
