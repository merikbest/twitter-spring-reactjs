import {makeStyles, Theme} from "@material-ui/core";

export const useRecommendationsModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 34,
            color: theme.palette.primary.main,
        },
    },
    content: {
        height: 550,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    contentWrapper: {
        margin: "0px 32px",
    },
    infoText: {
        padding: "12px 0px",
    },
    checkboxWrapper: {
        marginTop: 12,
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: 530,
        marginBottom: 30,
    },
}));