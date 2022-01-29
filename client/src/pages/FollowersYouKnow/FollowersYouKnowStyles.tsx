import {makeStyles, Theme} from "@material-ui/core";

export const useFollowersYouKnowStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        paddingBottom: 500,
    },
    contentWrapper: {
        paddingTop: 48
    },
}));
