import {makeStyles, Theme} from "@material-ui/core";

export const useSuggestedListsStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        paddingBottom: 500,
    },
    content: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    contentImage: {
        paddingTop: 52,
        inset: 0,
        width: "100%",
        height: "100%",
    },
    infoWrapper: {
        textAlign: "center",
        padding: 32,
    },
    infoTitle: {
        marginBottom: 8,
    },
    listsTitle: {
        padding: "12px 16px",
    },
}));
