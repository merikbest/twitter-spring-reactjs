import { makeStyles } from "@material-ui/core";

export const usePopperInfoStyles = makeStyles((theme) => ({
    userInfoWrapper: {
        display: "inline-block",
        marginTop: 4,
        "& a": {
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline !important"
            }
        }
    },
    lockIcon: {
        "& svg": {
            color: theme.palette.text.primary,
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em"
        }
    }
}));
