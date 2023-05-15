import { makeStyles } from "@material-ui/core";

export const useSuggestedListsStyles = makeStyles(() => ({
    content: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0
    },
    contentImage: {
        paddingTop: 52,
        inset: 0,
        width: "100%",
        height: "100%"
    },
    infoWrapper: {
        textAlign: "center",
        padding: 32
    },
    infoTitle: {
        marginBottom: 8
    }
}));
