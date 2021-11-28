import {makeStyles, Theme} from "@material-ui/core";

export const useChangeUsernameStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
    },
    suggestionsWrapper: {
        padding: "12px 16px",
    },
    title: {
        marginBottom: 10,
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: theme.palette.text.primary
    },
    suggestionText: {
        padding: "12px 0px",
        color: theme.palette.primary.main,
        fontWeight: 400,
        fontSize: 15,
        "&:hover": {
          cursor: "pointer",
          textDecoration: "underline"
        },
    },
    buttonWrapper: {
        padding: "12px 16px",
        float: "right",
        height: 30,
    },
}));
