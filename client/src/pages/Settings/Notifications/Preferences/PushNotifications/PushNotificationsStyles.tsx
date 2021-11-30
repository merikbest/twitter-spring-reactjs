import {makeStyles, Theme} from "@material-ui/core";

export const usePushNotificationsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    itemTitle: {
        paddingBottom: 4,
        fontWeight: 700,
        fontSize: 15,
        color: theme.palette.text.primary,
        lineHeight: "20px"
    },
    switch: {
        marginTop: -9,
        float: "right",
    },
    connectedAppsWrapper: {
        margin: "32px auto",
        width: 336,
        textAlign: "center"
    },
    title: {
        marginBottom: 8,
        lineHeight: "36px",
        fontSize: 31,
        fontWeight: 800,
        color: theme.palette.text.primary,
    },
    subtitle: {
        lineHeight: "20px",
        fontSize: 15,
        fontWeight: 400,
        color: theme.palette.text.secondary,
    },
}));
