import { makeStyles } from "@material-ui/core";

export const useScheduleDateInfoStyles = makeStyles((theme) => ({
    infoWrapper: {
        marginBottom: 10,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 12,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    }
}));
