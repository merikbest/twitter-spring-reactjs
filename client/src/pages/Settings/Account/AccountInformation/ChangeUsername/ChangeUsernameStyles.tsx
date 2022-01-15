import {makeStyles, Theme} from "@material-ui/core";

export const useChangeUsernameStyles = makeStyles((theme: Theme) => ({
    textFieldWrapper: {
        padding: "12px 16px",
    },
    suggestionsWrapper: {
        padding: "12px 16px",
        "& .MuiTypography-h5": {
            marginBottom: 10,
        },
        "& .MuiTypography-body1": {
            padding: "12px 0px",
            color: theme.palette.primary.main,
            "&:hover": {
                cursor: "pointer",
                textDecoration: "underline"
            },
        },
    },
    buttonWrapper: {
        padding: "12px 16px",
        float: "right",
        height: 30,
    },
}));
