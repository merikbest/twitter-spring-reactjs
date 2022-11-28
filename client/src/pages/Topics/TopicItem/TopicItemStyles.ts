import {makeStyles, Theme} from "@material-ui/core";

export const useTopicItemStyles = makeStyles((theme: Theme) => ({
    topicItem: {
        "& .MuiButtonGroup-root": {
            padding: "4px 0px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
        },
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
        borderTop: `1px solid rgb(185, 202, 211)`,
        borderBottom: `1px solid rgb(185, 202, 211)`,
        borderLeft: `1px solid rgb(185, 202, 211)`,

    },
    topicItemCloseButton: {
        height: 40,
        borderTop: `1px solid rgb(185, 202, 211)`,
        borderBottom: `1px solid rgb(185, 202, 211)`,
        // borderRight: `1px solid ${theme.palette.grey["700"]}`,
        borderRight: `1px solid rgb(185, 202, 211)`,
        borderLeftStyle: "unset",
        padding: "0px 12px 0px 0px",
        minWidth: 1,
        "& hr": {
            marginRight: 12,
        },
        "& svg": {
            fill: "rgb(185, 202, 211)",
        },
    },
}));
