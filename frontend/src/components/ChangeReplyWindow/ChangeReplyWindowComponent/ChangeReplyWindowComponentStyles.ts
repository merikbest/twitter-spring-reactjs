import { createStyles, makeStyles } from "@material-ui/core";

export const useChangeReplyWindowComponentStyles = makeStyles((theme) => createStyles({
    listItem: {
        height: 60,
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&.MuiListItem-button": {
            "&:hover": {
                backgroundColor: theme.palette.secondary.main
            }
        }
    },
    iconCircle: {
        marginRight: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
    },
    icon: {
        "& svg": {
            marginTop: 5,
            height: "1.35em",
            fill: theme.palette.common.white
        }
    },
    checkIcon: {
        marginLeft: "auto",
        "& svg": {
            color: theme.palette.primary.main,
            marginTop: 5,
            height: "1.3em"
        }
    }
}));
