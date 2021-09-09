import {makeStyles, Theme} from "@material-ui/core";

export const useListsStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        marginBottom: 500,
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
        '& h6': {
            fontWeight: 800,
        },
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
    icon: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: "rgb(27, 149, 224)",
                verticalAlign: "bottom",
                height: "0.90em",
            },
        },
    },
    pinnedLists: {
        paddingTop: 52,
        height: 220,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        '& h6': {
            margin: "12px 16px",
            fontWeight: 800,
        },
    },
    pinnedListsText: {
        fontSize: 15,
        color: "rgb(83, 100, 113)",
        marginTop: 32,
        marginLeft: 32,
    },
    newLists: {
        maxHeight: 316,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        '& h6': {
            margin: "12px 16px",
            fontWeight: 800,
        },
    },
    myLists: {
        height: 316,
        border: 0,
        borderRadius: 0,
        '& h6': {
            margin: "12px 16px",
            fontWeight: 800,
        },
    },
}));
