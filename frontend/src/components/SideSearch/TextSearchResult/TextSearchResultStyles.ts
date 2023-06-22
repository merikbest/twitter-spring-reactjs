import { makeStyles } from "@material-ui/core";

export const useTextSearchResultStyles = makeStyles((theme) => ({
    searchTextResult: {
        height: 80
    },
    searchIcon: {
        "& svg": {
            marginRight: 15,
            width: "1.8rem",
            height: "1.8rem",
            fill: theme.palette.text.primary
        }
    },
    closeIconButton: {
        marginLeft: "auto",
        float: "right"
    }
}));
