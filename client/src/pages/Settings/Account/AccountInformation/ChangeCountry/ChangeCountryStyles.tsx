import {makeStyles, Theme} from "@material-ui/core";

export const useChangeCountryStyles = makeStyles((theme: Theme) => ({
    selectWrapper: {
        padding: "12px 16px",
        "& .MuiFormControl-root": {
            width: "100%"
        },
        "& .MuiTypography-subtitle2": {
            paddingTop: 2,
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
