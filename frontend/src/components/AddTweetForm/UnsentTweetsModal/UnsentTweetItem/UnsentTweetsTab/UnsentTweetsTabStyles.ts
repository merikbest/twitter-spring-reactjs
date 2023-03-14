import { makeStyles } from "@material-ui/core";

export const useUnsentTweetsTabStyles = makeStyles((theme) => ({
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 105,
            maxWidth: 90,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        }
    },
    tab: {
        minWidth: 299,
        textTransform: "none"
    }
}));
