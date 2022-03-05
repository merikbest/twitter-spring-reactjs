import {makeStyles, Theme} from "@material-ui/core";

export const useListsStyles = makeStyles((theme: Theme) => ({
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
    icon: {
        display: "inline-block",
    },
    dropdownLink: {
        color: "black",
        textDecoration: "none",
    },
    dropdown: {
        padding: 16,
        position: 'absolute',
        width: 165,
        height: 52,
        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.secondary.main,
        },
    },
    textIcon: {
        "& svg": {
            verticalAlign: -3,
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
    pinnedLists: {
        paddingTop: 52,
        minHeight: 220,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    pinnedListsText: {
        marginTop: 32,
        marginLeft: 32,
    },
    pinnedListsWrapper: {
        padding: 4,
    },
    newLists: {
        maxHeight: 345,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    showMore: {
        padding: 16,
        color: theme.palette.primary.main,
        '&:hover': {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main,
        },
    },
    myLists: {
        height: 316,
        border: 0,
        borderRadius: 0,
    },
}));
