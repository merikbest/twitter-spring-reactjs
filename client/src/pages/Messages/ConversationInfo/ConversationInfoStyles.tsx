import {makeStyles, Theme} from "@material-ui/core";

export const useConversationInfoStyles = makeStyles((theme: Theme) => ({
    container: {
        minWidth: 600,
        "& .MuiPaper-outlined": {
            padding: 0,
            borderRadius: 0,
            minHeight: '100vh',
            borderLeft: 0,
            borderTop: 0,
            borderBottom: 0,
        },
    },
    header: {
        position: "fixed",
        display: 'flex',
        margin: 0,
        padding: 0,
        width: 598,
        height: 53,
        zIndex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        borderRadius: 0,
        alignItems: 'center',
        flex: 1,
        '& h6': {
            fontWeight: 800,
            lineHeight: "20px",
        },
    },
    pageInfoWrapper: {
        paddingTop: 65,
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingBottom: 12,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    participantInfoWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    participantAvatar: {
        width: "48px !important",
        height: "48px !important",
        marginRight: 15,
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    outlinedButton: {
        float: 'right',
        marginRight: 15,
        width: 79,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    blockButton: {
        backgroundColor: theme.palette.error.main,
    },
    containedButton: {
        float: 'right',
        marginRight: 15,
        width: 105,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    notificationsInfoWrapper: {
        padding: "12px 16px",
    },
    text: {
        paddingTop: 12,
    },
    switchWrapper: {
        display: "flex",
        justifyContent: "space-between"
    },
    conversationInfoButton: {
        textAlign: "center",
        padding: 16,
        cursor: "pointer",
    },
    blockUser: {
        "& .MuiTypography-body1": {
            color: theme.palette.primary.main,
        },
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
    leaveConversation: {
        "& .MuiTypography-body1": {
            color: theme.palette.error.main,
        },
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
}));
