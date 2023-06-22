import { makeStyles } from "@material-ui/core";

export const useDiscoverListsStyles = makeStyles((theme) => ({
    newLists: {
        maxHeight: 345,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0
    },
    showMore: {
        padding: 16,
        color: theme.palette.primary.main,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    }
}));
