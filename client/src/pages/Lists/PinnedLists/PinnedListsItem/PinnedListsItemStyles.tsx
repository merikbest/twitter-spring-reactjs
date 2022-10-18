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
        textAlign: "center"
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
}));
