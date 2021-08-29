import {makeStyles, Theme} from "@material-ui/core";

export const useExploreStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: 0,
        borderBottom: 0,
        marginBottom: 500,
    },
    header: {
        position: "fixed",
        width: 602,
        zIndex: 1,
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
    editButton: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            marginLeft: 25,
            width: 40,
            height: 40,
            color: "rgb(29, 161, 242)",
            "& span": {
                paddingTop: 5,
                "& svg" : {
                    height: "0.90em",
                },
            },
        },
    },
    loading: {
        marginTop: 50,
        textAlign: 'center',
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 35,
            maxWidth: 50,
            height: 4,
            backgroundColor: "rgb(29, 161, 242)",
        },
        "& .MuiTab-root": {
            fontSize: 15,
            textTransform: "none !important",
            minWidth: 120,
            fontWeight: 700,
        },
    },
}));
