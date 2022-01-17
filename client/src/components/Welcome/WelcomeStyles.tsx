import {makeStyles, Theme} from "@material-ui/core";

export const useWelcomeStyles = makeStyles((theme: Theme) => ({
    info: {
        padding: "40px 20px",
        textAlign: "center",
        "& .MuiTypography-subtitle1": {
            marginTop: 12,
            marginBottom: 20,
        },
    },
    infoButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));
