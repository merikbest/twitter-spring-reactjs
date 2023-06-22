import { makeStyles } from "@material-ui/core";

export const useCurrentSessionStyles = makeStyles((theme) => ({
    sessionInfo: {
        display: "inline-flex",
        justifyContent: "flex-start"
    },
    deviceIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 48,
        height: 48,
        border: "1px solid rgb(229, 234, 236)",
        borderRadius: "50%"
    },
    deviceIcon: {
        "& svg": {
            color: theme.palette.text.primary,
            height: "1.7em"
        }
    }
}));
