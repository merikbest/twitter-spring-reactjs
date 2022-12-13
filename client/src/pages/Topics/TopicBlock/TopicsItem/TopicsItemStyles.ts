import {makeStyles, Theme} from "@material-ui/core";

export const useTopicsItemStyles = makeStyles((theme: Theme) => ({
    topicItem: {
        padding: "4px 0px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        "& .MuiTypography-h6": {
            fontWeight: 700,
            marginRight: 12,
        },
        "& .MuiButton-label": {
            justifyContent: "space-between"
        },
        "& svg": {
            width: "1.172rem",
            height: "1.172rem",
            fill: theme.palette.primary.main,
        },
        "& .MuiButton-root:hover": {
            backgroundColor: theme.palette.secondary.light,
        }
    },
    topicItemTextInfo: {
        flexGrow: 1,
        flexBasis: 0,
        height: 40,
        padding: "7px 12px 7px 16px",
        border: `1px solid rgb(185, 202, 211)`,
    },
}));
