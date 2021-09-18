import {makeStyles, Theme} from "@material-ui/core";

export const useListsMembershipsStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        marginBottom: 500,
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
    infoWrapper: {
        paddingTop: 84,
        margin: "0 auto",
        width: 336,
        textAlign: "center",

    },
    title: {
        fontWeight: 800,
        fontSize: 31,
    },
    text: {
        fontSize: 15,
        color: "rgb(83, 100, 113)",
    },
}));
