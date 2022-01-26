import {makeStyles, Theme} from "@material-ui/core";

export const useListsStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        paddingBottom: 500,
        '& .MuiTypography-h5': {
            margin: "12px 16px",
        },
    },
    header: {
        position: "fixed",
        width: 602,
        height: 52,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '& .MuiTypography-h5': {
            margin: 0,
        },
    },
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
        maxHeight: 316,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    showMore: {
        padding: 16,
        color: theme.palette.primary.main,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.03)"
        },
    },
    myLists: {
        height: 316,
        border: 0,
        borderRadius: 0,
    },
}));
