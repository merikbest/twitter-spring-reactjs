import { makeStyles } from "@material-ui/core";

export const useTweetReplyConversationStyles = makeStyles((theme) => ({
    iconWrapper: {
        display: "inline-block",
        marginTop: 8,
        marginBottom: 4
    },
    iconCircle: {
        marginRight: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
    },
    icon: {
        "& svg": {
            height: "0.75em",
            fill: theme.palette.common.white
        }
    }
}));
