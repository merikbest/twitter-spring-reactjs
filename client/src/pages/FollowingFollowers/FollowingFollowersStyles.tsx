import {makeStyles} from "@material-ui/core";

export const useFollowingFollowersStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
    },
    header: {
        position: "fixed",
        display: 'flex',
        width: 602,
        zIndex: 1,
        border: 0,
        alignItems: 'center',
        flex: 1,
    },
    contentWrapper: {
        paddingTop: 57
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    tab: {
        minWidth: 301,
        textTransform: 'none',
    },
    content: {
        margin: "40px 20px",
        textAlign: "center",
        "& .MuiTypography-subtitle1": {
            marginTop: 12,
            marginBottom: 16,
        },
    },
}));
