import {makeStyles, Theme} from "@material-ui/core";

export const useChangeUsernameStyles = makeStyles((theme: Theme) => ({
    suggestionsWrapper: {
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
        float: "right",
        height: 30,
    },
}));
