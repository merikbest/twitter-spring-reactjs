import {makeStyles, Theme} from "@material-ui/core";

export const useExploreStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: 0,
        borderBottom: 0,
        paddingBottom: 500,
    },
    header: {
        position: "fixed",
        width: 602,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    backButtonWrapper: {
        display: "inline-block",
        paddingTop: 5
    },
    editButton: {
        marginLeft: 35
    },
    contentWrapper: {
        paddingTop: 97
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 35,
            maxWidth: 50,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontSize: 15,
            textTransform: "none !important",
            minWidth: 120,
            fontWeight: 700,
        },
    },
}));
