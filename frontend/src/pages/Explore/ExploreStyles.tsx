import { makeStyles } from "@material-ui/core";

export const useExploreStyles = makeStyles((theme) => ({
    backButtonWrapper: {
        display: "inline-block",
        paddingTop: 5
    },
    editButton: {
        marginLeft: 35
    },
    contentWrapper: {
        paddingTop: 97
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 35,
            maxWidth: 50,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontSize: 15,
            textTransform: "none !important",
            minWidth: 120,
            fontWeight: 700
        }
    }
}));
