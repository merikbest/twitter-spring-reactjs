import {makeStyles, Theme} from "@material-ui/core";

export const usePinnedListsItemStyles = makeStyles((theme: Theme) => ({
    pinnedListWrapper: {
        display: "inline-block",
        width: 99,
        padding: "8px 15px 15px 15px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.03)",
        },
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: "none",
    },
    listAvatar: {
        width: "68px !important",
        height: "68px !important",
        borderRadius: 12,
        marginRight: 15,
    },
    pinnedListName: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
}));
