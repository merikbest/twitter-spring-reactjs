import {makeStyles, Theme} from "@material-ui/core";

export const useChangeCountryStyles = makeStyles((theme: Theme) => ({
    selectWrapper: {
        "& .MuiFormControl-root": {
            width: "100%"
        },
        "& .MuiTypography-subtitle2": {
            paddingTop: 2,
        },
    },
}));
