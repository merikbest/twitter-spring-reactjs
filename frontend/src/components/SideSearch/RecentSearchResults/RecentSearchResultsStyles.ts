import { makeStyles, Theme } from "@material-ui/core";

export const useRecentSearchResultsStyles = makeStyles((theme: Theme) => ({
    header: {
        padding: 12,
        display: "inline-block"
    },
    searchText: {
        padding: 12,
        paddingTop: 20,
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    clearButton: {
        height: 24,
        margin: 12,
        padding: "0px 12px",
        float: "right"
    }
}));
