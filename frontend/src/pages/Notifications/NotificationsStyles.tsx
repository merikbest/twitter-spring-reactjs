import { makeStyles } from "@material-ui/core";

export const useNotificationsStyles = makeStyles((theme) => ({
    header: {
        border: 0
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        },
        "& .MuiTab-labelIcon": {
            minHeight: 0,
            paddingTop: 0
        }
    },
    tab: {
        minWidth: 301,
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    mentionNotification: {
        position: "absolute",
        marginBottom: "25px !important",
        marginLeft: 75,
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
    }
}));
