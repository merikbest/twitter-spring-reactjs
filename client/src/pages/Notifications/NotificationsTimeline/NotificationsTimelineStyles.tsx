import {makeStyles, Theme} from "@material-ui/core";

export const useNotificationsTimelineStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
    },
    header: {
        position: "fixed",
        width: 602,
        height: 53,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    title: {
        fontWeight: 800,
        fontSize: 20,
        lineHeight: "24px",
    },
    contentWrapper: {
        paddingTop: 48
    },
}));
