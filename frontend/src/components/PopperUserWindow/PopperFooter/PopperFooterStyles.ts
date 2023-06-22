import { makeStyles } from "@material-ui/core";

export const usePopperFooterStyles = makeStyles(() => ({
    userInfo: {
        marginTop: 12,
        marginBottom: 12,
        whiteSpace: "initial"
    },
    userFollowersWrapper: {
        "& .MuiTypography-h6": {
            marginRight: 2
        },
        "& .MuiTypography-subtitle1": {
            marginRight: 10
        }
    },
    followLink: {
        textDecoration: "none",
        color: "inherit",
        "&:hover": {
            textDecoration: "underline !important"
        }
    }
}));

