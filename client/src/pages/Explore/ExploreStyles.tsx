import {makeStyles, Theme} from "@material-ui/core";

export const useExploreStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: 0,
        borderBottom: 0,
        paddingBottom: 500,
    },
    header: {
        position: "fixed",
        width: 602,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        '& h6': {
            fontWeight: 800,
        },
    },
    backButtonWrapper: {
        display: "inline-block",
        paddingTop: 5
    },
    editButton: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            marginLeft: 25,
            width: 40,
            height: 40,
            "& svg": {
                marginTop: 5,
                verticalAlign: "bottom",
                color: theme.palette.primary.main,
                height: "0.90em",
            },
        },
    },
    contentWrapper: {
        paddingTop: 97
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 35,
            maxWidth: 50,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontSize: 15,
            textTransform: "none !important",
            minWidth: 120,
            fontWeight: 700,
        },
    },
}));
