import React, {FC, ReactElement} from 'react';
import {Switch, Typography} from "@material-ui/core";

import {usePushNotificationsStyles} from "./PushNotificationsStyles";

const PushNotifications: FC = (): ReactElement => {
    const classes = usePushNotificationsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.itemTitle}>
                    Push notifications
                    <span className={classes.switch}>
                        <Switch defaultChecked/>
                    </span>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Get push notifications to find out what’s going on when you’re not on Twitter. You can turn them off
                    anytime.
                </Typography>
            </div>
            <div className={classes.connectedAppsWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Turn on push notifications
                </Typography>
                <Typography component={"div"} className={classes.subtitle}>
                    To receive notifications as they happen, turn on push notifications. You’ll also receive them when
                    you’re not on Twitter. Turn them off anytime.
                </Typography>
            </div>
        </>
    );
};

export default PushNotifications;
