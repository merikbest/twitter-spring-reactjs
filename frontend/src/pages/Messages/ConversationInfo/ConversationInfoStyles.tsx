import { makeStyles } from "@material-ui/core";

export const useConversationInfoStyles = makeStyles((theme) => ({
    container: {
        minWidth: 600,
        padding: 0,
        borderLeft: 0
    },
    header: {
        width: 598
    },
    pageInfoWrapper: {
        paddingTop: 65,
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: 15,
        paddingBottom: 12,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    participantInfoWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    participantAvatar: {
        width: "48px !important",
        height: "48px !important",
        marginRight: 15
    },
    buttonWrapper: {
        float: "right",
        marginRight: 15
    },
    outlinedButton: {
        width: 79,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    blockButton: {
        backgroundColor: theme.palette.error.main
    },
    containedButton: {
        width: 105,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    },
    text: {
        paddingTop: 12
    },
    switchWrapper: {
        display: "flex",
        justifyContent: "space-between"
    },
    conversationInfoButton: {
        textAlign: "center",
        padding: 16,
        cursor: "pointer"
    },
    blockUser: {
        "& .MuiTypography-body1": {
            color: theme.palette.primary.main
        },
        "&:hover": {
            backgroundColor: theme.palette.action.hover
        }
    },
    leaveConversation: {
        "& .MuiTypography-body1": {
            color: theme.palette.error.main
        },
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    }
}));
