import { makeStyles, Theme } from "@material-ui/core";

export const useRecentSearchResultsStyles = makeStyles((theme: Theme) => ({
    header: {
        padding: 12
    },
    searchText: {
        padding: 12,
        paddingTop: 20,
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));
