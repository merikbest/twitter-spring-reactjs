import React, {FC, ReactElement} from 'react';
import {Switch, Typography} from "@material-ui/core";

import {usePushNotificationsStyles} from "./PushNotificationsStyles";

const PushNotifications: FC = (): ReactElement => {
    const classes = usePushNotificationsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Push notifications
                    <span className={classes.switch}>
                        <Switch defaultChecked/>
                    </span>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Get push notifications to find out what’s going on when you’re not on Twitter. You can turn them off
                    anytime.
                </Typography>
            </div>
            <div className={classes.connectedAppsWrapper}>
                <Typography variant={"h4"} component={"div"}>
                    Turn on push notifications
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    To receive notifications as they happen, turn on push notifications. You’ll also receive them when
                    you’re not on Twitter. Turn them off anytime.
                </Typography>
            </div>
        </>
    );
};

export default PushNotifications;
