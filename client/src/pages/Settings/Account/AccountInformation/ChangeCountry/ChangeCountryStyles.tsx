import {makeStyles, Theme} from "@material-ui/core";

export const useChangeCountryStyles = makeStyles((theme: Theme) => ({
    selectWrapper: {
        padding: "12px 16px",
        "& .MuiFormControl-root": {
            width: "100%"
        }
    },
    countryInfo: {
        paddingTop: 2,
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontWeight: 400
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
