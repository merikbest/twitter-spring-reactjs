import { makeStyles } from "@material-ui/core";

export const useSendDirectTweetModalStyles = makeStyles((theme) => ({
    content: {
        "& .MuiChip-root": {
            marginLeft: 8,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            "& .MuiChip-label": {
                fontSize: 15,
                fontWeight: 700
            },
            "& .MuiChip-deleteIcon": {
                color: theme.palette.primary.main
            }
        }
    },
    footer: {
        position: "absolute",
        padding: "4px 8px",
        minHeight: 56,
        width: "100%",
        borderTop: `3px solid ${theme.palette.divider}`,
        bottom: 0
    },
    chatIcon: {
        display: "inline-block",
        marginLeft: 3,
        marginTop: 3
    }
}));
