import {makeStyles} from "@material-ui/core";

export const useBookmarksStyles= makeStyles((theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        paddingBottom: 500,
    },
    header: {
        marginLeft: 15,
        position: "fixed",
        width: 580,
        height: 53,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        '& h6': {
            fontWeight: 800,
        },
    },
    headerFullName: {
        fontWeight: 800,
        fontSize: 20,
        lineHeight: "24px",
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
