import {makeStyles, Theme} from "@material-ui/core";

export const usePollStyles = makeStyles((theme: Theme) => ({
    container: {
        maxWidth: 507,
        minHeight: 300,
        marginLeft: 55,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
    },
    pollInputWrapper: {
        padding: "11px 11px 0px 11px",
    },
    addPollInputWrapper: {
        position: "relative",
    },
    addPollInputButton: {
        position: "absolute",
        bottom: 0,
        marginLeft: 10,
        padding: 5,
    },
    pollLength: {
        padding: 11,
        borderLeft: 0,
        borderRight: 0,
        border: `1px solid ${theme.palette.divider}`,
    },
    pollLengthTitle: {
        marginBottom: 3,
    },
    pollSelect: {
        marginRight: 19,
    },
    footer: {
        textAlign: "center",
        border: 0,
        borderRadius: "0px 0px 16px 16px",
        height: 47,
        "& div": {
            paddingTop: 13,
            fontSize: 14,
            color: theme.palette.error.main,
        },
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(244, 33, 46, 0.1)",
        },
    },
}));
