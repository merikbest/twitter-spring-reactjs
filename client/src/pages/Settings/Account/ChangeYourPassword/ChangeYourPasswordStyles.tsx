import {makeStyles, Theme} from "@material-ui/core";

export const useChangeYourPasswordStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px"
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    buttonWrapper: {
        padding: "12px 16px",
        float: "right",
        height: 30,
    },
}));
