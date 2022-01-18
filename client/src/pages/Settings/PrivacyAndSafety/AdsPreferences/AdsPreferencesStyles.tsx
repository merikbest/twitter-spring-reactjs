import {makeStyles, Theme} from "@material-ui/core";

export const useAdsPreferencesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    infoItem: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
    adsPreferencesWrapper: {
        textDecoration: "none",
    },
    adsPreferencesLink: {
        padding: "12px 16px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer"
        },
        "& svg": {
            float: "right",
            color: theme.palette.text.secondary,
            height: "1.4em"
        },
    },
}));
