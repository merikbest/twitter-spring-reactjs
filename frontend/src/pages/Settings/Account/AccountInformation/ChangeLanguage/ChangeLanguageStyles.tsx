import { makeStyles } from "@material-ui/core";

export const useChangeLanguageStyles = makeStyles(() => ({
    selectWrapper: {
        padding: "12px 16px",
        "& .MuiFormControl-root": {
            width: "100%"
        }
    },
    languageInfo: {
        paddingTop: 2
    },
    buttonWrapper: {
        padding: "12px 16px",
        float: "right"
    }
}));
