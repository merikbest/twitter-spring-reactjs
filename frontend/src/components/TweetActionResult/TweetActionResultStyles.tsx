import { makeStyles } from "@material-ui/core";

export const useTweetActionResultStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        marginLeft: 32,
        marginBottom: 4,
        color: theme.palette.text.secondary,
        "& svg": {
            verticalAlign: "bottom",
            height: "1.20em"
        },
        "& .MuiTypography-subtitle2": {
            marginLeft: 12,
            fontWeight: 700
        }
    }
}));

