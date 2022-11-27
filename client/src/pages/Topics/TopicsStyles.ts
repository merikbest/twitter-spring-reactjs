import {makeStyles, Theme} from "@material-ui/core";

export const useTopicsStyles = makeStyles((theme: Theme) => ({
    tabs: {
        paddingTop: 53,
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTab-root": {
            minWidth: 200,
            fontWeight: 700,
            textTransform: "none",
        },
        "& .MuiTabs-indicator": {
            marginLeft: 65,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
    },
    topicItem: {
        "& .MuiButton-outlined": {
            // borderColor: theme.palette.divider,
            border: `1px solid ${theme.palette.divider} !important`,
            // padding: "5px 12px 5px 16px"
        },
        "& .MuiTypography-h6": {
            fontWeight: 700,
            marginRight: 12,
        },
        "& svg": {
            width: "1.172rem",
            height: "1.172rem",
            fill: theme.palette.primary.main,
        },
    },
    topicItemTextInfo: {
        padding: "5px 12px 5px 16px"
    },
    topicItemCloseButton: {
        borderLeftStyle: "unset",
        padding: "0px 12px 0px 0px",
        minWidth: 1,
        "& hr": {
            marginRight: 12,
        },
        "& svg": {
            fill: theme.palette.text.secondary,
        },
    },
}));
