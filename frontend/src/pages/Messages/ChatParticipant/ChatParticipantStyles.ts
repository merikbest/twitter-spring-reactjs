import { makeStyles } from "@material-ui/core";

export const useChatParticipantStyles = makeStyles((theme) => ({
    listItem: {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    userWrapper: {
        height: 76,
        borderTop: `1px solid ${theme.palette.divider}`,
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: "pointer"
    },
    userAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 15
    },
    username: {
        marginLeft: 5
    }

}));
