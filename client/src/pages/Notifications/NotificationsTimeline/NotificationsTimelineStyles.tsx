import {makeStyles, Theme} from "@material-ui/core";

export const useNotificationsTimelineStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
    },
    contentWrapper: {
        paddingTop: 48
    },
}));
