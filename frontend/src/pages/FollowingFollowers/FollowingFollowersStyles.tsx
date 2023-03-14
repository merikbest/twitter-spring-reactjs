import { makeStyles } from "@material-ui/core";

export const useFollowingFollowersStyles = makeStyles((theme) => ({
    header: {
        border: 0
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        }
    },
    tab: {
        minWidth: 301,
        textTransform: "none"
    }
}));
