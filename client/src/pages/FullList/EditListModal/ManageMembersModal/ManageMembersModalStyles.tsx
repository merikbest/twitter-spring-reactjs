import {makeStyles, Theme} from "@material-ui/core";

export const useManageMembersModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
            border: 0,
        },
        "& .MuiIconButton-root": {
            marginRight: 15,
            "& svg": {
                height: "1.0em",
                fill: theme.palette.primary.main,
            },
        },
    },
    content: {
        height: 577,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 105,
            maxWidth: 90,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    tab: {
        minWidth: 299,
        textTransform: 'none',
    },
    inputWrapper: {
        padding: "0px 12px",
    },
    suggestedInfoWrapper: {
        width: 320,
        margin: "0 auto",
        marginTop: 32,
        textAlign: "center",
    },
    suggestedTitle: {
        fontSize: 31,
        marginBottom: 8,
        fontWeight: 800,
    },
    suggestedText: {
        fontSize: 15,
        color: theme.palette.text.secondary,
    },
}));
