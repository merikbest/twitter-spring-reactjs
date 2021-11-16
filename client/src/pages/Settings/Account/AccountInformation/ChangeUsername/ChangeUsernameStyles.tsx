import {makeStyles, Theme} from "@material-ui/core";

export const useChangeUsernameStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    suggestionsWrapper: {
        padding: "12px 16px",
    },
    title: {
        marginBottom: 10,
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: "rgb(15, 20, 25)"
    },
    suggestionText: {
        padding: "12px 0px",
        color: "rgb(29, 155, 240)",
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
