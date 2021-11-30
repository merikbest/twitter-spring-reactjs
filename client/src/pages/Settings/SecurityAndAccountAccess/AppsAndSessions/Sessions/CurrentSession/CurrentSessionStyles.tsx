import {makeStyles, Theme} from "@material-ui/core";

export const useCurrentSessionStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    title: {
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: theme.palette.text.primary,
    },
    text: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontWeight: 400,
        lineHeight: "16px",
    },
    sessionInfo: {
        display: "inline-flex",
        justifyContent: "flex-start"
    },
    OSTypeText: {
        fontSize: 15,
        color: theme.palette.text.primary,
        fontWeight: 400,
        lineHeight: "20px",
    },
    active: {
        padding: "1px 4px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4,
        height: 20,
        color: theme.palette.common.white,
        fontSize: 13,
        lineHeight: "16px",
    },
    deviceIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 48,
        height: 48,
        border: "1px solid rgb(229, 234, 236)",
        borderRadius: "50%",
    },
    deviceIcon: {
        "& svg": {
            color: theme.palette.text.primary,
            height: "1.7em"
        },
    },
}));
