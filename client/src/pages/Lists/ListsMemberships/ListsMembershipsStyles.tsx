import {makeStyles, Theme} from "@material-ui/core";

export const useListsMembershipsStyles = makeStyles((theme: Theme) => ({
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
    infoWrapper: {
        paddingTop: 84,
        margin: "0 auto",
        width: 336,
        textAlign: "center",
    },
    title: {
        fontWeight: 800,
        fontSize: 31,
        lineHeight: "36px",
        marginBottom: 8
    },
    text: {
        fontSize: 15,
        color: theme.palette.text.secondary,
        lineHeight: "20px"
    },
}));
