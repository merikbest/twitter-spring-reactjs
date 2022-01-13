import {makeStyles, Theme} from "@material-ui/core";

export const useSetPasswordModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        height: 600,
        marginTop: 5,
        padding: "0 30px",
        position: "relative",
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
    button: {
        position: "absolute",
        bottom: 0,
        width: 490,
        marginBottom: 30,
    },
}));
