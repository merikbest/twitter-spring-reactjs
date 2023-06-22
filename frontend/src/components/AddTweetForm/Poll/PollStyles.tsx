import { makeStyles } from "@material-ui/core";

export const usePollStyles = makeStyles((theme) => ({
    container: {
        maxWidth: 507,
        minHeight: 300,
        border: `1px solid ${theme.palette.grey[100]}`,
        borderRadius: 16
    },
    pollInputWrapper: {
        padding: "11px 11px 0px 11px"
    },
    addPollInputWrapper: {
        position: "relative",
        "& .MuiIconButton-root": {
            position: "absolute",
            bottom: 0,
            marginLeft: 6,
            padding: 5
        }
    },
    addPollInputButton: {
        "& .MuiIconButton-root": {
            position: "absolute",
            bottom: 0,
            marginLeft: 6,
            padding: 5
        }
    },
    pollLength: {
        padding: 11,
        borderLeft: 0,
        borderRight: 0,
        border: `1px solid ${theme.palette.grey[100]}`
    },
    pollLengthTitle: {
        marginBottom: 4
    },
    pollSelect: {
        marginRight: 19
    },
    footer: {
        textAlign: "center",
        border: 0,
        borderRadius: "0px 0px 16px 16px",
        height: 47,
        "& .MuiTypography-body1": {
            paddingTop: 13,
            color: theme.palette.error.main
        },
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    }
}));
