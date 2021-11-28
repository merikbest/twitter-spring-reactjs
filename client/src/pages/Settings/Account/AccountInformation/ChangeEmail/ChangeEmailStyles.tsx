import {makeStyles, Theme} from "@material-ui/core";

export const useChangeEmailStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
    },
    updateEmailAddress: {
        textAlign: "center",
        padding: 16,
        color: theme.palette.primary.main,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "20px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(29, 155, 240, 0.1)"
        }
    },
}));
