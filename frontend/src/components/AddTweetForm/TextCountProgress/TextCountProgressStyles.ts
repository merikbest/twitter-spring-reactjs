import { makeStyles } from "@material-ui/core";

export const useTextCountProgressStyles = makeStyles((theme) => ({
    footerAddFormCircleProgress: {
        position: "relative",
        width: 20,
        height: 20,
        margin: "0 10px",
        "& .MuiCircularProgress-root": {
            position: "absolute"
        }
    },
    progressColor: {
        color: theme.palette.error.main
    },
    defaultProgressColor: {
        color: "rgba(0, 0, 0, 0.1)"
    }
}));
