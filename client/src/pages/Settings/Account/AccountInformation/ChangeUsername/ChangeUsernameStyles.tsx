import {makeStyles, Theme} from "@material-ui/core";

export const useChangeUsernameStyles = makeStyles((theme: Theme) => ({
    container: {
        minWidth: 600,
        "& .MuiPaper-outlined": {
            padding: 0,
            borderRadius: 0,
            minHeight: '100vh',
            borderLeft: 0,
            borderTop: 0,
            borderBottom: 0,
        },
    },
    listWrapper: {
        paddingTop: 53,
    },
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
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: "rgb(15, 20, 25)"
    },
    suggestionText: {
        padding: "12px 0px",
        color: "rgb(29, 155, 240)",
        fontWeight: 400,
        fontSize: 15
    },
    buttonWrapper: {
        padding: "12px 16px",
        float: "right",
        height: 30,
    },
}));
