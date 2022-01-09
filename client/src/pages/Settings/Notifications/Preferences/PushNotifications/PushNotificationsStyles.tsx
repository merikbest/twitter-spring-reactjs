import {makeStyles, Theme} from "@material-ui/core";

export const usePushNotificationsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
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
}));
