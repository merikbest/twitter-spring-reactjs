import { makeStyles } from "@material-ui/core";

export const usePinnedListsStyles = makeStyles(() => ({
    pinnedLists: {
        paddingTop: 52,
        minHeight: 220,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0
    },
    pinnedListsWrapper: {
        padding: 4
    },
    pinnedListsText: {
        marginTop: 32,
        marginLeft: 32
    }
}));
