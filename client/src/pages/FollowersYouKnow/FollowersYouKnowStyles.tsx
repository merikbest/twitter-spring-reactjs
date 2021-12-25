import {makeStyles, Theme} from "@material-ui/core";

export const useFollowersYouKnowStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        paddingBottom: 500,
    },
    header: {
        position: "fixed",
        width: 602,
        height: 52,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '& h6': {
            fontWeight: 800,
            marginLeft: 16,
        },
    },
    headerFullName: {
        fontWeight: 800,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.palette.text.primary,
    },
    headerUsername: {
        fontSize: 13,
        lineHeight: "16px",
        color: theme.palette.text.secondary,
    },
    contentWrapper: {
        paddingTop: 48
    },
    infoWrapper: {
        marginTop: 32,
        margin: "0 auto",
        width: 400,
        textAlign: "center",
    },
    infoTitle: {
        fontSize: 31,
        fontWeight: 800,
        lineHeight: "36px",
        marginBottom: 8,
    },
    infoText: {
        fontSize: 15,
        color: theme.palette.text.secondary,
    },
}));
