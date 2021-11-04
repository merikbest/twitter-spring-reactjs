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
        color: "rgb(83, 100, 113)",
        fontWeight: 400
    },
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));
