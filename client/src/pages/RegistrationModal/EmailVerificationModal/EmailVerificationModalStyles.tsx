import {makeStyles, Theme} from "@material-ui/core";

export const useEmailVerificationModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        height: 600,
        marginTop: 5,
        padding: "0 30px",
        "& .MuiTypography-h3": {
            marginTop: 20,
        },
        "& .MuiTypography-subtitle1": {
            marginTop: 15,
        },
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            height: "1.75rem",
            width: "1.75rem",
            color: theme.palette.primary.main,
        },
    },
    link: {
        linHeight: "20px",
        marginLeft: 10,
        marginTop: 2,
        fontSize: 12,
        color: theme.palette.primary.main,
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
        },
    },
    buttonWrapper: {
        marginTop: 320
    },
}));
