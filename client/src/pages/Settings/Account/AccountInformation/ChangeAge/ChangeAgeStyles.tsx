import {makeStyles, Theme} from "@material-ui/core";

export const useChangeAgeStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        "& .MuiTypography-body1": {
            padding: "12px 16px",
        },
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
