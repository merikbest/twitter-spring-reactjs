import {makeStyles, Theme} from "@material-ui/core";

export const useChangeYourPasswordStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px"
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
    buttonWrapper: {
        padding: "12px 16px",
        float: "right",
        height: 30,
    },
}));
