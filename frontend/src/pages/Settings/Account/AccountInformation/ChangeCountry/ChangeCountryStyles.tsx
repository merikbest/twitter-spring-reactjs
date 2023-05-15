import { makeStyles } from "@material-ui/core";

export const useChangeCountryStyles = makeStyles(() => ({
    selectWrapper: {
        "& .MuiFormControl-root": {
            width: "100%"
        },
        "& .MuiTypography-subtitle2": {
            paddingTop: 2
        }
    }
}));
