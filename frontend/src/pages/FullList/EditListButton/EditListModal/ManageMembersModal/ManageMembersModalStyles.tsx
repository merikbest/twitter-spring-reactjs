import { makeStyles } from "@material-ui/core";

export const useManageMembersModalStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
            border: 0
        },
        "& .MuiIconButton-root": {
            marginRight: 15
        }
    },
    container: {
        padding: "0px 12px"
    },
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
    },
    manageMembers: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: "12px 16px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        },
        "& svg": {
            fill: theme.palette.text.secondary,
            height: "1.20em"
        }
    }
}));
